import notFound from "../assets/img/404.gif";
import {IUser} from "../interfaces/interfaces";
import {FC, useEffect, useState} from "react";
import '../assets/styles/card.css'
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {setUser} from "../store/slices/userSlice";
import {useDeleteUserMutation} from "../store/apis/userApi";
import {ConfirmationCard} from "./ConfirmationCard";

interface ICardProps {
    user: IUser
}

export const Card: FC<ICardProps> = ({user}) => {
    const navigate = useNavigate();
    // const state = useAppSelector(state => state.userSelected)
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const [deleteUser, {
        isLoading: isLoadingDelete,
        error: errorDelete,
        status: statusDelete
    }] = useDeleteUserMutation();


    const handleSelection = () => {
        navigate('/user');
        dispatch(setUser(user));
    }
    const handleDelete = () => {
        deleteUser(user.id)
    }
    return (
        <>
            <div className='card'>
                <div className='card__image'>
                    <img src={user.avatar.includes('https') ? user.avatar : notFound}
                         alt={'image' + user.id}/>
                </div>
                <div className='card__body'>
                    <h4>{user.first_name} {user.second_name} </h4>
                    <h5>{user.email}</h5>
                    <div className='card__body__buttonGroup'>
                        <button className='button' onClick={handleSelection}>
                            Update
                        </button>
                        <button className='button button--delete' onClick={()=>setShowConfirmation(true)}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
            {showConfirmation && <ConfirmationCard confirmation={handleDelete} reject={()=>setShowConfirmation(false)} />}
        </>
    )
}