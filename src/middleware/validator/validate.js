const validate = (schema) => (req, res, next) => {
  try {
    const parsed = schema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Bad Request",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    req.body = parsed.data;
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      serverMessage: error.message,
    });
  }
};

module.exports = validate;
