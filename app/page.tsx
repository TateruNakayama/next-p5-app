import { Inter } from 'next/font/google'
import P5Component from '@/components/p5'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <P5Component />
    </>
  )
}