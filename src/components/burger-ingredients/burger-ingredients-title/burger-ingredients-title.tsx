import PropTypes from 'prop-types'
import React, { FC } from 'react'

interface IBurgerIngredientsTitle{
  children: string;
}

const BurgerIngredientsTitle: FC<IBurgerIngredientsTitle> = ({children}) => {
  return (
    <h2 className="text text_type_main-medium mb-6">{children}</h2>
  )
}

export default BurgerIngredientsTitle