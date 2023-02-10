// export const
export const checkAge = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("请输入年龄"))
  }
  setTimeout(() => {
    if (typeof value !== "number") {
      callback(new Error("情输入数字"))
    } else {
      if (value < 18 || value > 150) {
        callback(new Error("情输入合理年龄"))
      } else {
        callback()
      }
    }
  }, 300)
}

export const checkSex = (rule, value, callback) => {
  console.log(value)
  if (!value) {
    return callback(new Error("请选择性别"))
  }

  if (![1, 0, "男", "女"].includes(value)) {
    callback(new Error("请选择正确的性别"))
  } else {
    callback()
  }
}
