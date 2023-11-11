import s from './MyInput.module.css';


export const MyInput = (props) => {
    return (
        <input className={s.myInput} {...props} />
    )
}
