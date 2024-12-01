import React from 'react'
import ingretientsDetailsStyle from './ingredient-details.module.css'
import { ingredientType } from '../../../utils/types'
import PropTypes from 'prop-types'
const IngredientDetails = ({data}) => {
  return (
    <div className={ingretientsDetailsStyle.container}>
        <img src={data.image_large} alt={data.name} />
        <p className={`text text_type_main-medium mt-4 mb-8`}>{data.name}</p>
        <div className={ingretientsDetailsStyle.footer}>
            <div className={ingretientsDetailsStyle.info}>
                <p className={`text text_type_main-default`}>Калории,ккал</p>
                <p className='text text_type_digits-default'>{data.calories}</p>
            </div>
            <div className={ingretientsDetailsStyle.info}>
                <p className={`text text_type_main-default`}>Белки, г</p>
                <p className='text text_type_digits-default'>{data.proteins}</p>
            </div>
            <div className={ingretientsDetailsStyle.info}>
                <p className={`text text_type_main-default`}>Жиры, г</p>
                <p className='text text_type_digits-default'>{data.fat}</p>
            </div>
            <div className={ingretientsDetailsStyle.info}>
                <p className={`text text_type_main-default`}>Углеводы, г</p>
                <p className='text text_type_digits-default'>{data.carbohydrates}</p>
            </div>
        </div>
    </div>
  )
}
IngredientDetails.propTypes = {
    data: PropTypes.object
}
export default IngredientDetails