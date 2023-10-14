import { Controller } from '../../../types/controller'
import banksData from '../../../seed/offices.json'

const controller: Controller = {
  getNearest: (req, res) => {
    const { lat, lng, dist } = req.query

    if (!lat || !lng || !dist) {
      return res.status(400).json({
        message: 'Invalid coordinates',
      })
    }

    const flat = parseFloat(lat as string)
    const flng = parseFloat(lng as string)
    const fdist = parseFloat(dist as string)

    if (isNaN(flat) || isNaN(flng) || isNaN(fdist)) {
      return res.status(400).json({
        message: 'Invalid coordinates',
      })
    }

    return banksData
      .map(bank => ({
        ...bank,
        distance: Math.sqrt(
          Math.pow(bank.latitude - flat, 2) +
            Math.pow(bank.longitude - flng, 2),
        ),
      }))
      .filter(bank => bank.distance <= fdist)
      .sort((a, b) => a.distance - b.distance)
  },
}

export default controller
