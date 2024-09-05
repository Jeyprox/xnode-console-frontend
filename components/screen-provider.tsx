'use client'

import { PropsWithChildren, useEffect, useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'

const MOBILE_BREAKPOINT = 1024

type ScreenProviderProps = PropsWithChildren<{}>
export default function ScreenProvider({ children }: ScreenProviderProps) {
  const [showDialog, setShowDialog] = useState(false)

  useEffect(() => {
    if (window.innerWidth < MOBILE_BREAKPOINT) {
      setShowDialog(true)
    }
    const handleResize = () => {
      if (window.innerWidth > MOBILE_BREAKPOINT) {
        setShowDialog(false)
      } else {
        setShowDialog(true)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      {children}
    </>
  )
}
