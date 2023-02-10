<template>
  <div class="login">
    <el-card class="login-wrap p-4 pt-0">
      <h3 style="text-align: center" class="pb-2">系统登录</h3>
      <el-form
        :rules="rules"
        :model="data"
        label-width="70px"
        class="form-login"
        status-icon
        ref="formLogin"
      >
        <el-form-item prop="username" label="用户名">
          <el-input v-model="data.username" placeholder="用户名" />
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="data.password" placeholder="密码" />
        </el-form-item>
        <el-form-item class="btns pt-3">
          <el-button @click="onReset">重置</el-button>
          <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { username, password } from "@/utils/rules/login"
import { ElMessage, type FormInstance } from "element-plus"
import { reactive, ref } from "vue"
import Cookies from "js-cookie"
import Mock from "mockjs"
import { getMenu } from "@/api/permission"
import { useRouter } from "vue-router"
import { useMenuStore } from "@/stores/menu"
const router = useRouter()
const menuStore = useMenuStore()
const formLogin = ref<FormInstance>()
interface data {
  username: string
  password: string
}
const data: data = reactive({
  username: "",
  password: "",
})
const rules = reactive({
  username: [
    {
      validator: username,
      trigger: "blur",
      required: true,
    },
  ],
  password: [
    {
      validator: password,
      trigger: "blur",
      required: true,
    },
  ],
})
const onReset = async () => {
  formLogin.value?.resetFields()
}

const onSubmit = async () => {
  await formLogin.value?.validate(async (valid) => {
    if (valid) {
      try {
        const { data: data1 } = await getMenu(data)
        if (data1.code == 20000) {
          menuStore.setMenu(data1.data.menu)
          menuStore.addMenu(router)
          Cookies.set("token", data1.data.token)
          router.push({
            name: "home",
          })
        } else {
          return ElMessage.error(`登录失败，${data1.data.message}`)
        }
      } catch (error) {}
    }
  })
}
</script>

<style scoped lang="scss">
.login {
  position: relative;
  height: 100vh;
  background-color: #eaeaea;

  .btns {
    :deep(.el-form-item__content) {
      margin-left: 0 !important;
      justify-content: center;
    }
  }
  .login-wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 360px;
    border-radius: 12px;
    .form-login {
      overflow: hidden;
    }
  }
}
</style>
