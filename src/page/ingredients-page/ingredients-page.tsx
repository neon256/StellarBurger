import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ingretientsDetailsStyle from './ingredients-page.module.css'
import { IBurgerIngredients } from '../../utils/ingredients-interface'
import { RootState } from '../../services/type/data'
import { useAppSelector } from '../../utils/hook'


const IngredientsPage = () => {
    const ingredients = useAppSelector((state) => state.ingridient.data)
    const {id} = useParams()
    const data = ingredients.find((item: IBurgerIngredients) => item._id == id);
  return (
    <div className={ingretientsDetailsStyle.container}>
            <img src={data?.image_large} alt={'ошибка'} />
            <p className={`text text_type_main-medium mt-4 mb-8`}>{data?.name}</p>
            <div className={ingretientsDetailsStyle.footer}>
                <div className={ingretientsDetailsStyle.info}>
                    <p className={`text text_type_main-default`}>Калории,ккал</p>
                    <p className='text text_type_digits-default'>{data?.calories}</p>
                </div>
                <div className={ingretientsDetailsStyle.info}>
                    <p className={`text text_type_main-default`}>Белки, г</p>
                    <p className='text text_type_digits-default'>{data?.proteins}</p>
                </div>
                <div className={ingretientsDetailsStyle.info}>
                    <p className={`text text_type_main-default`}>Жиры, г</p>
                    <p className='text text_type_digits-default'>{data?.fat}</p>
                </div>
                <div className={ingretientsDetailsStyle.info}>
                    <p className={`text text_type_main-default`}>Углеводы, г</p>
                    <p className='text text_type_digits-default'>{data?.carbohydrates}</p>
                </div>
            </div>
    </div>
  )
}

export default IngredientsPage