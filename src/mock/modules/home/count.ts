import mockjs from "mockjs"

export const getCount = () => {
  return {
    msg: "请求数据成功",
    data: [
      {
        name: "今日支付订单",
        value: 1234,
        icon: "CircleCheckFilled",
        color: "#2ec7c9",
      },
      {
        name: "今日收藏订单",
        value: 210,
        icon: "StarFilled",
        color: "#ffb980",
      },
      {
        name: "今日未支付订单",
        value: 1234,
        icon: "GoodsFilled",
        color: "#5ab1ef",
      },
      {
        name: "本月支付订单",
        value: 1234,
        icon: "CircleCheckFilled",
        color: "#2ec7c9",
      },
      {
        name: "本月收藏订单",
        value: 210,
        icon: "StarFilled",
        color: "#ffb980",
      },
      {
        name: "本月未支付订单",
        value: 1234,
        icon: "GoodsFilled",
        color: "#5ab1ef",
      },
    ],
  }
}
