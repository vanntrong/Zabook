export function serverErrorHandler(err, res) {
  console.log(err);
  res.status(500).json(err);
}
