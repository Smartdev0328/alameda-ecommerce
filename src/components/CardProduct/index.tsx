import {
  CardProductContainer,
  CardProductImgContainer,
  CardProductInfo,
} from './styles'
import { motion } from 'framer-motion'
import { ProductInfoModal } from '../../containers/ProductInfoModal'
import { useCardProduct } from '../../hooks/useCardProduct'
import { productInterface } from '../../interfaces'

interface CardProductProps {
  name: string
  images: string[]
  currentProductIndex?: number
  isMaybe?: boolean
}

export const CardProduct = ({
  name,
  images,
  currentProductIndex,
  isMaybe,
}: CardProductProps) => {
  const {
    isOpen,
    isHover,
    handleMouseEnter,
    handleMouseLeave,
    handleOpen,
    setIsOpen,
  } = useCardProduct()

  return (
    <CardProductContainer
      as={motion.div}
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 150,
        duration: 0.5,
      }}
      viewport={{ once: true }}
    >
      <CardProductImgContainer
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {!isHover ? (
          <img src={images[0]} alt={name} />
        ) : (
          <>
            <motion.img
              src={images.length > 1 ? images[1] : images[0]}
              alt={name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.5 } }}
            />

            {window.innerWidth > 768 && !isMaybe && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: {
                    duration: 0.3,
                    ease: 'easeIn',
                  },
                }}
                onClick={handleOpen}
              >
                Vista Rápida
              </motion.button>
            )}
          </>
        )}
      </CardProductImgContainer>

      {isOpen && (
        <ProductInfoModal
          setIsOpen={setIsOpen}
          currentProductIndex={currentProductIndex}
        />
      )}

      <CardProductInfo>
        <h3>{name}</h3>
        <span>$50.00</span>
      </CardProductInfo>
    </CardProductContainer>
  )
}
