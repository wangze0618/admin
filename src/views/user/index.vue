<template>
  <div class="container">
    <div class="header">
      <el-button type="primary" size="large" class="mt-2" @click="handleAdd()">
        新增＋
      </el-button>
      <!-- 搜索框 -->
      <el-form class="search mt-2" :model="searchData">
        <el-input
          style="height: 32px"
          placeholder="搜索"
          v-model="searchData.name"
        />
      </el-form>
    </div>
    <el-divider style="margin: 0.8rem 0 0.8rem 0" />
    <div class="table-wrap">
      <el-table class="table" :data="tableData" stripe style="width: 100%">
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="age" label="年龄" />
        <el-table-column prop="sex" :formatter="changeSex" label="性别" />
        <el-table-column prop="birth" label="出生日期" />
        <el-table-column prop="addr" label="地址" />
        <el-table-column label="操作">
          <!-- 作用域插槽 -->
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
        <template #empty> 暂无数据 </template>
      </el-table>
    </div>

    <el-dialog v-model="dialogVisible" title="Tips" width="50%">
      <!-- form -->
      <el-form
        :inline="true"
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        label-width="100px"
        class="demo-ruleForm"
        :rules="rules"
        :label-position="labelPosition"
      >
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="ruleForm.name"
            type="username"
            autocomplete="off"
            placeholder="请输入姓名"
          />
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input
            v-model.number="ruleForm.age"
            type="age"
            autocomplete="off"
            placeholder="请输入年龄"
          />
        </el-form-item>

        <el-form-item label="性别" prop="sex">
          <el-select v-model="ruleForm.sex" placeholder="请选择性别">
            <el-option :value="1" label="男">男</el-option>
            <el-option :value="0" label="女">女</el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
            format="YYYY/MM/DD"
            value-format="YYYY-MM-DD"
            v-model="ruleForm.birth"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="ruleForm.addr" placeholder="请输入地址" />
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogClose(false)">取消</el-button>
          <el-button type="primary" @click="dialogClose(true)">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- pagenation -->
    <div class="pagenation1 mt-4">
      <el-pagination
        background
        :current-page="curr"
        :page-size="10"
        layout="prev, pager, next"
        :total="total"
        @size-change="sizeChange($event)"
        @current-change="currChange($event)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onBeforeUnmount, onMounted, watch } from "vue"
import type { FormInstance, FormRules } from "element-plus"
import { ElMessageBox, ElPagination } from "element-plus"
import { checkAge, checkSex } from "@/utils/rules/form"
import type { search } from "@/type/user/user"
import { getUserList, createUser, updateUser, deleteUser } from "@/api/user"
const labelPosition = ref("right")
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  name: [
    { required: true, message: "请输入姓名", trigger: "blur" },
    { min: 2, max: 5, message: "长度在2-5个字符", trigger: "blur" },
  ],
  age: [{ validator: checkAge, trigger: "blur", required: true }],
  sex: [{ validator: checkSex, trigger: "change", required: true }],
  birth: [
    {
      required: true,
      message: "请选择出生日期",
    },
  ],
  addr: [
    {
      required: true,
      message: "请选择地址",
      trigger: blur,
    },
  ],
})
let time
const dialogVisible = ref(false)
let modelType = ref(0)
const changeSex = (row, column, cellValue) => {
  return cellValue == 1 ? "男" : "女"
}

const handleAdd = () => {
  modelType.value = 0
  dialogVisible.value = true
  ruleForm = reactive({
    name: "",
    addr: "",
    age: "",
    birth: "",
    sex: "",
  })
}
const handleEdit = (index, row) => {
  modelType.value = 1
  dialogVisible.value = true
  ruleForm = JSON.parse(JSON.stringify(row))
}
const handleDelete = async (index, row) => {
  try {
    await ElMessageBox.confirm("确定删除这条数据？", "确认删除", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
    console.log(await deleteUser({ id: row.id }))
    getList()
  } catch (error) {
    console.log(error)
  }
}
let tableData = ref([])
const options = [
  {
    value: 0,
    label: "女",
  },
  {
    value: 1,
    label: "男",
  },
]
let ruleForm = reactive({
  name: "",
  age: "",
  sex: "",
  birth: "",
  addr: "",
})

// 关闭或提交dialog 清除表单内容
const dialogClose = async (data?: Boolean) => {
  if (data == true) {
    await ruleFormRef.value?.validate(async (valid, fields) => {
      if (valid) {
        if (modelType.value === 0) {
          // 新增用户
          await createUser(ruleForm)
          // getList()
        } else {
          await updateUser(ruleForm)
          // getList()
          // 编辑用户
        }
        time = setTimeout(() => {
          dialogVisible.value = false
          ruleFormRef.value?.resetFields()
          getList()
        }, 300)
      }
    })
  }
  if (data == false) {
    ruleForm.addr = ""
    ruleForm.age = ""
    ruleForm.birth = ""
    ruleForm.name = ""
    ruleForm.sex = ""
    ruleFormRef.value.resetFields()

    dialogVisible.value = false
  }
}
const searchData: search = reactive({
  name: "",
})
// 获取用户数据
const getList = async (all) => {
  let { data } = await getUserList(all)
  tableData.value = data.list
  total.value = data.count || 0
}
onMounted(async () => {
  watch(
    () => [curr.value, searchData.name],
    (val) => {
      console.log(val)
      getList({
        name: val[1],
        page: curr.value,
        limit: 10,
      })
    },
    {
      immediate: true,
      deep: true,
    }
  )
})
onBeforeUnmount(() => {
  clearTimeout(time)
})

let total = ref<number>(0)
let curr = ref<number>(1)
const sizeChange = (e) => {
  console.log(e)
}
const currChange = (e) => {
  curr.value = e
  console.log(e)
}
</script>
<style scoped lang="scss">
.header {
  display: flex;
  // align-items: center;
  .search {
    margin-left: auto;
    margin-right: 2rem;
    display: flex;
  }
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
.container {
  .table {
    height: 650px;
  }
}
.pagenation1 {
  display: grid;
  justify-content: center;
}
</style>
