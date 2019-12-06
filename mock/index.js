// import Mock from "mockjs";

export default [
  {
    url: "/goods/list",
    type: "post",
    response: (req, res) => {
      res.json({
        code: 20000,
        data: {
          aaa: 123456
        }
      });
    }
  }
];
