// const corsOptions = {
//   origin: (
//     origin: string | undefined,
//     callback: (err: Error | null, allow?: boolean) => void
//   ) => {
//     const allowedOrigins = (process.env.ALLOWED_ORIGINS || "")
//       .split(",")
//       .map((value: string) => (value === "undefined" ? undefined : value))
//       .filter((value) => value !== null && value !== "");
//     if (allowedOrigins.includes(origin!)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true,
// };
// export default corsOptions;
const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    callback(null, true); // Always allow all origins
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

export default corsOptions;
