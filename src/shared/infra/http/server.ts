import { app } from '@shared/app/app'

app.listen(process.env.PORT || 3333, () => {
  console.log('Server is running...')
})
