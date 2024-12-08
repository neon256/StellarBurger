import React, { useRef } from 'react'
import burgerConstructorStyle from '../burger-constructor.module.css'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'
import { CHANGE_INGREDIENTS_POSITION, INGREDIENTS_SAVE } from '../../../services/actions/burger-constructor'
const BurgerConstructorListElement = ({ ing, id, index, moveIngredient }) => {
    const ref = useRef(null)

    const [{ handlerId }, drop] = useDrop({
        accept: "element",
        collect(monitor) {
          return {
            handlerId: monitor.getHandlerId(),
          };
        },
        hover(item, monitor) {
          if (!ref.current) {
            return;
          }
          const dragIndex = item.index
          const hoverIndex = index
    
          if (dragIndex === hoverIndex) {
            return;
          }
          
          const hoverBoundingRect = ref.current?.getBoundingClientRect()
          const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
          const clientOffset = monitor.getClientOffset()
    
          let hoverClientY = 0
          if (clientOffset !== null) {
            hoverClientY = clientOffset.y - hoverBoundingRect.top
          }
    
          if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
          }
          if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
          }
    
          moveIngredient(dragIndex, hoverIndex);
          item.index = hoverIndex;
        },
      });
      
      const [{ isDragging }, drag] = useDrag({
        type: 'element',
        item: () => {
          return { id, index }
        },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
      })
      drag(drop(ref))
    return (
        <>
            <li className={burgerConstructorStyle.ingredients} key={id} ref={ref}>
                <DragIcon type="primary" />
                <ConstructorElement
                    text={ing.name}
                    price={ing.price}
                    thumbnail={ing.image}
                />
            </li>
        </>

    )
}

export default BurgerConstructorListElement