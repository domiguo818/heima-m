export const MobileRules = [
  { required: true, message: '请输入手机号' },
  {
    pattern:
      /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
    message: '请输入正确的手机号'
  }
]
export const CheckNum = [
  { required: true, message: '请输入验证码' },
  { pattern: /^\d{6}$/, message: '请输入六位验证码' }
]
