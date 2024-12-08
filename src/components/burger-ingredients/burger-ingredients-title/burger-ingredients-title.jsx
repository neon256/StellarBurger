import PropTypes from 'prop-types'
import React from 'react'

const BurgerIngredientsTitle = (props) => {
  return (
    <h2 className="text text_type_main-medium mb-6">{props.children}</h2>
  )
}
BurgerIngredientsTitle.propTypes = {
  children: PropTypes.string,
}
export default BurgerIngredientsTitle