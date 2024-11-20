import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import headerStyles from './app-header.module.css';

class AppHeader extends React.Component{
    state = {  } 
    render() { 
        return (
            <header className={headerStyles.header}>
                <nav className={headerStyles.nav}>
                    <div style={{display:'flex', justifyContent:'space-between', flex: '0 1 62%'}}>
                        <div style={{display:"flex"}}>
                            <a href="" className={`text text_type_main-default p-5 mr-2 ${headerStyles.active}`}><BurgerIcon type="secondary" className="mr-2"/>Конструктор</a>
                            <a href="" className={`text text_type_main-default p-5 mr-2 ${headerStyles.link}`}><ListIcon type="secondary" className="mr-2"/>Лента заказов</a>
                        </div>    
                        <Logo className="mt-6 mb-6"/>
                    </div>
                    <a href="" className={`text text_type_main-default p-5 mr-2 ${headerStyles.link}`} ><ProfileIcon type="secondary" className="mr-2"/>Личный кабинет</a>
                </nav>
            </header>
        );
    }
}
 
export default AppHeader;