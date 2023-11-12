export const User = ({user}) => {
    return (
        <div onClick={(e) => e.stopPropagation()}>
            {user.id}. Жилец -- {user.name}
        </div>
    )
}
