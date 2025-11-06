
'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { QRCodeSVG as QRCode } from 'qrcode.react'
import toast, { Toaster } from 'react-hot-toast'
import { 
  Phone, 
  Mail, 
  Instagram, 
  Linkedin, 
  Facebook, 
  Download,
  MessageCircle,
  QrCode,
  Building2,
  User,
  Globe,
  Github,
  Banknote
} from 'lucide-react'
import { motion } from 'framer-motion'

interface ContactInfo {
  name: string
  title: string
  company: string
  companyUrl: string
  phone: string
  email: string
  instagram: string
  linkedin: string
  facebook: string
  github: string
  pixKey: string
}

const contactInfo: ContactInfo = {
  name: 'Patrick de Campos Farani',
  title: 'Dev LLM',
  company: 'Valid Certificadora',
  companyUrl: 'https://validcertificadora.com.br/',
  phone: '+55 11 991033078',
  email: 'patrickfarani@gmail.com',
  instagram: 'https://www.instagram.com/patrickfarani/',
  linkedin: 'https://www.linkedin.com/in/patrick-de-campos-farani-52184889/',
  facebook: 'https://www.facebook.com/patrick.farani/',
  github: 'https://github.com/PatrickFarani',
  pixKey: '+5511991033078'
}

export function DigitalCard() {
  const [currentUrl, setCurrentUrl] = useState('')
  const [isQrVisible, setIsQrVisible] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href)
    }
  }, [])

  const handleWhatsApp = () => {
    const message = encodeURIComponent('Olá, recebi seu cartão virtual. Já vou salvar os seus dados na minha lista de contatos!!!\nhttps://patrickfarani.abacusai.app/')
    const phoneNumber = contactInfo?.phone?.replace(/\D/g, '') ?? ''
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
    window?.open?.(whatsappUrl, '_blank')
  }

  const handleCopyPix = async () => {
    try {
      await navigator?.clipboard?.writeText(contactInfo?.pixKey ?? '')
      toast.success('Chave Pix copiada!', {
        duration: 3000,
        position: 'bottom-center',
        style: {
          background: '#10b981',
          color: '#fff',
        },
      })
    } catch (error) {
      toast.error('Erro ao copiar chave Pix', {
        duration: 3000,
        position: 'bottom-center',
      })
    }
  }

  const generateVCard = () => {
    // Dividir o nome para o formato N (sobrenome;nome)
    const nameParts = (contactInfo?.name ?? '').split(' ')
    const firstName = nameParts[0] ?? ''
    const lastName = nameParts.slice(1).join(' ') ?? ''
    
    const vCard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `N:${lastName};${firstName};;;`,
      `FN:${contactInfo?.name ?? ''}`,
      `TITLE:${contactInfo?.title ?? ''}`,
      `ORG:${contactInfo?.company ?? ''}`,
      `TEL;TYPE=CELL:${contactInfo?.phone ?? ''}`,
      `EMAIL;TYPE=INTERNET:${contactInfo?.email ?? ''}`,
      `URL:${contactInfo?.companyUrl ?? ''}`,
      `X-SOCIALPROFILE;TYPE=instagram:${contactInfo?.instagram ?? ''}`,
      `X-SOCIALPROFILE;TYPE=linkedin:${contactInfo?.linkedin ?? ''}`,
      `X-SOCIALPROFILE;TYPE=facebook:${contactInfo?.facebook ?? ''}`,
      `X-SOCIALPROFILE;TYPE=github:${contactInfo?.github ?? ''}`,
      'END:VCARD'
    ].join('\r\n')

    const blob = new Blob([vCard], { type: 'text/vcard' })
    const url = URL.createObjectURL(blob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = `${contactInfo?.name?.replace(/\s+/g, '_') ?? 'contato'}.vcf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const socialLinks = [
    {
      name: 'Instagram',
      url: contactInfo?.instagram ?? '',
      icon: Instagram,
      color: 'text-pink-600 hover:text-pink-700',
      isPix: false
    },
    {
      name: 'LinkedIn', 
      url: contactInfo?.linkedin ?? '',
      icon: Linkedin,
      color: 'text-blue-600 hover:text-blue-700',
      isPix: false
    },
    {
      name: 'Facebook',
      url: contactInfo?.facebook ?? '',
      icon: Facebook,
      color: 'text-blue-800 hover:text-blue-900',
      isPix: false
    },
    {
      name: 'GitHub',
      url: contactInfo?.github ?? '',
      icon: Github,
      color: 'text-gray-800 hover:text-gray-900',
      isPix: false
    },
    {
      name: 'Pix',
      url: contactInfo?.pixKey ?? '',
      icon: Banknote,
      color: 'text-teal-600 hover:text-teal-700',
      isPix: true
    }
  ]

  return (
    <>
      <Toaster />
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl shadow-2xl p-8 border border-gray-100 relative overflow-hidden"
          style={{
            backgroundImage: 'url(/MATRIX.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
        {/* Overlay para melhorar a legibilidade */}
        <div className="absolute inset-0 bg-black/40 -z-0 rounded-2xl"></div>
        
        {/* Conteúdo com z-index maior */}
        <div className="relative z-10">
        {/* Avatar e Info Principal */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="relative w-32 h-32 mx-auto mb-4">
            <div className="w-full h-full rounded-full overflow-hidden shadow-lg ring-4 ring-blue-600/20">
              <Image
                src="/profile.jpg"
                alt="Patrick de Campos Farani"
                width={128}
                height={128}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
            {contactInfo?.name ?? ''}
          </h1>
          
          <div className="flex items-center justify-center gap-2 mb-2">
            <Building2 className="w-4 h-4 text-green-400" />
            <p className="text-lg font-semibold text-green-400 drop-shadow-lg">
              {contactInfo?.title ?? ''}
            </p>
          </div>
          
          <div className="flex items-center justify-center gap-2">
            <Globe className="w-4 h-4 text-green-300" />
            <a 
              href={contactInfo?.companyUrl ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-300 hover:text-green-200 transition-colors drop-shadow-lg"
            >
              {contactInfo?.company ?? ''}
            </a>
          </div>
        </motion.div>

        {/* Botões de Ação Principais */}
        <motion.div 
          className="space-y-3 mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <button
            onClick={handleWhatsApp}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <MessageCircle className="w-5 h-5" />
            Conversar no WhatsApp
          </button>
          
          <button
            onClick={generateVCard}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Download className="w-5 h-5" />
            Salvar Contato
          </button>
        </motion.div>

        {/* Informações de Contato */}
        <motion.div 
          className="space-y-3 mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="flex items-center gap-3 p-3 bg-black/40 backdrop-blur-sm rounded-xl border border-green-500/30">
            <Phone className="w-5 h-5 text-green-400" />
            <a 
              href={`tel:${contactInfo?.phone ?? ''}`}
              className="text-white hover:text-green-400 transition-colors font-medium"
            >
              {contactInfo?.phone ?? ''}
            </a>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-black/40 backdrop-blur-sm rounded-xl border border-green-500/30">
            <Mail className="w-5 h-5 text-green-400" />
            <a 
              href={`mailto:${contactInfo?.email ?? ''}`}
              className="text-white hover:text-green-400 transition-colors font-medium"
            >
              {contactInfo?.email ?? ''}
            </a>
          </div>
        </motion.div>

        {/* Redes Sociais */}
        <motion.div 
          className="flex justify-center gap-4 mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {socialLinks.map((social) => (
            <button
              key={social.name}
              onClick={() => {
                if (social.isPix) {
                  handleCopyPix()
                } else {
                  try {
                    window?.open?.(social.url, '_blank', 'noopener,noreferrer')
                  } catch (error) {
                    console.warn(`Não foi possível abrir ${social.name}`)
                  }
                }
              }}
              className="p-3 bg-black/40 backdrop-blur-sm border border-green-500/30 rounded-xl hover:bg-black/60 hover:border-green-400 text-green-400 hover:text-green-300 transition-all duration-200 hover:scale-110"
              aria-label={social.name}
              title={social.isPix ? `Copiar chave ${social.name}` : `Visitar ${social.name}`}
            >
              <social.icon className="w-6 h-6" />
            </button>
          ))}
        </motion.div>

        {/* QR Code */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          <button
            onClick={() => setIsQrVisible(!isQrVisible)}
            className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors font-medium"
          >
            <QrCode className="w-5 h-5" />
            {isQrVisible ? 'Ocultar QR Code' : 'Mostrar QR Code'}
          </button>
          
          {isQrVisible && currentUrl && (
            <motion.div 
              className="mt-4 p-4 bg-black/40 backdrop-blur-sm border border-green-500/30 rounded-xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <QRCode
                value={currentUrl}
                size={160}
                bgColor="#ffffff"
                fgColor="#1f2937"
                level="M"
                className="mx-auto"
              />
              <p className="text-xs text-green-300 mt-2">
                Escaneie para acessar este cartão
              </p>
            </motion.div>
          )}
        </motion.div>
        
        {/* Texto Descritivo */}
        <motion.div 
          className="text-center mt-6 pt-6 border-t border-green-500/30"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <h3 className="text-lg font-bold text-green-400 mb-3">
            Pai do Pietro e Erick
          </h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            Olá! Sou um profissional dedicado a criar impacto positivo. Ao longo da minha carreira, tenho sido apaixonado por desafios que inspiram crescimento e inovação. Vamos explorar juntos como posso contribuir para o seu sucesso e para o alcance dos seus objetivos.
          </p>
        </motion.div>
        </div>
      </motion.div>
    </div>
    </>
  )
}
