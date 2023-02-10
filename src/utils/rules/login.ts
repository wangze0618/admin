export const username = (rule, val, callback) => {
  if (!val) {
    return callback(new Error("请输入用户名！"))
  }
  if (val.length >= 12 || val.length <= 1) {
    callback(new Error("请输入正确的用户名"))
  } else {
    callback()
  }
}
export const password = (rule, val, callback) => {
  if (!val) {
    return callback(new Error("请输入密码！"))
  }
  callback()
}
