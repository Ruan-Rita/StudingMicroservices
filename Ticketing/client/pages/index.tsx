import { Asap } from 'next/font/google'
import axios from 'axios'
const inter = Asap({ subsets: ['latin'] })



const Home = function ({ }: any) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      home page
    </main>
  )
}

Home.getInitialProps = async () => {
  const response = await axios.get('http://ingress-nginx-controller.svc.cluster.local/api/user/currentuser').catch(error => {
    console.log('ERROR: ', error);
    return false
  })
  if (typeof window === 'undefined') {

  }

  return {}
}

export default Home
