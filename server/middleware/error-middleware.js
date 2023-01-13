import ApiError from '../exceptions/api-error.js'

export default function (err, req, res, next) {
  console.error(err)
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ messege: err.message, erros: err.errors })
  }

  return res.status(500).json({ message: 'Непредвиденная ошибка' })
}
