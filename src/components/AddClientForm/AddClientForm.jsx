import { MyButton } from "../UI/button/MyButton"
import { MyInput } from "../UI/input/MyInput"

export const AddClientForm = ({clientFormFlatId, activeFlat, name, phone, email, createClientInFlat}) => {
    return (
        <>
            {clientFormFlatId === activeFlat.id &&
                <form>
                    <h2>Добавте жильца</h2>
                    {(name.isDirty && name.minLengthError) && <div style={{color: 'red'}}>Введите больше символов для поля</div>}
                    {(name.isDirty && name.maxLengthError) && <div style={{color: 'red'}}>Слишком длинное имя жильца</div>}
                    {(name.isDirty && name.isEmpty) && <div style={{color: 'red'}}>Поле не может быть пустым</div>}
                    <MyInput
                        value={name.value}
                        onChange={e => {name.onChange(e)}}
                        onBlur={e => name.onBlur(e)}
                        type="text"
                        placeholder="name" 
                    /><br/>

                    {(phone.isDirty && phone.minLengthError) && <div style={{color: 'red'}}>Введите больше цифр для номера телефона</div>}
                    {(phone.isDirty && phone.maxLengthError) && <div style={{color: 'red'}}>Слишком длинный номер телефона</div>}
                    {(phone.isDirty && phone.isEmpty) && <div style={{color: 'red'}}>Поле не может быть пустым</div>}
                    <MyInput
                        value={phone.value}
                        onChange={e => {phone.onChange(e)}}
                        onBlur={e => phone.onBlur(e)}
                        type="text"
                        placeholder="phone"
                    /><br/>

                    {(email.isDirty && email.minLengthError) && <div style={{color: 'red'}}>Введите больше символов для поля</div>}
                    {(email.isDirty && email.isEmpty) && <div style={{color: 'red'}}>Поле не может быть пустым</div>}
                    {(email.isDirty && email.emailError) && <div style={{color: 'red'}}>Некоректный email</div>}
                    <MyInput
                        value={email.value}
                        onChange={e => {email.onChange(e)}}
                        onBlur={e => email.onBlur(e)}
                        type="text"
                        placeholder="email"
                    /><br/>

                    <MyButton
                        disabled={!name.inputValid || !phone.inputValid || !email.inputValid} 
                        onClick={e => {createClientInFlat(e, activeFlat.id)}}>
                        addClient
                    </MyButton>
                </form>
            }
        </>
    )
}
