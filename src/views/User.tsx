import {useForm, SubmitHandler} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {IUser} from "../interfaces/interfaces";
import '../assets/styles/user.css'
import {useDeleteUserMutation, usePosCreateUserMutation, useUpdateUserMutation} from "../store/apis/userApi";
import {Spinner} from "../components/Spinner";
import {BsFillArrowLeftCircleFill} from "react-icons/bs";
import {clearUser} from "../store/slices/userSlice";
import {ConfirmationCard} from "../components/ConfirmationCard";

export const User = () => {

    const {register, handleSubmit, formState: {errors}} = useForm<IUser>({mode: 'onBlur'});
    const user = useAppSelector(state => state.userSelected)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
    const [createUser, {
        isLoading: isLoadingCreate,
        error: errorCreate,
        status: statusCreate
    }] = usePosCreateUserMutation();
    const [updateUser, {
        isLoading: isLoadingUpdate,
        error: errorUpdate,
        status: statusUpdate
    }] = useUpdateUserMutation();
    const [deleteUser, {
        isLoading: isLoadingDelete,
        error: errorDelete,
        status: statusDelete
    }] = useDeleteUserMutation();

    useEffect(() => {
        if (statusDelete === 'fulfilled' || statusCreate === 'fulfilled' || statusUpdate === 'fulfilled') {
            navigate('/');
        }
    }, [statusDelete, statusCreate, statusUpdate]);

    const onSubmit: SubmitHandler<IUser> = (data) => {
        if (user.id) {
            updateUser({id: user.id, ...data})
            dispatch(clearUser());
            return;
        }
        dispatch(clearUser());
        createUser(data);
        navigate('/');
    };

    const handleDelete = () => {
        dispatch(clearUser());
        deleteUser(user.id);

    }
    const handleBack = () => {
        navigate('/');
        dispatch(clearUser());
    }

    return (
        <div className='user__container'>
            <form className='form' onSubmit={handleSubmit(onSubmit)}>
                <div className='container__back__button'>
                    <BsFillArrowLeftCircleFill className='container__back__button__img' onClick={handleBack}/>
                </div>
                <div className='form__section'>
                    <label className='form__label'>First Name</label>
                    <input className='form__input'
                           defaultValue={user.first_name} {...register("first_name", {
                        required: {
                            value: true,
                            message: 'Field is required'
                        },
                        pattern: {
                            value: /[a-zA-Z ]/,
                            message: 'The field only accepts letters '
                        }
                    })} />
                    {errors.first_name && <div className='form__error__message'>{errors.first_name.message}</div>}
                </div>
                <div className='form__section'>
                    <label className='form__label'>Second Name</label>
                    <input className='form__input'
                           defaultValue={user.second_name} {...register("second_name", {
                        required: {
                            value: true,
                            message: 'Field is required'
                        },
                        pattern: {
                            value: /[a-zA-Z ]/,
                            message: 'The field only accepts letters '
                        }
                    })} />
                    {errors.second_name && <div className='form__error__message'>{errors.second_name.message}</div>}
                </div>
                <div className='form__section'>
                    <label className='form__label'>Email</label>
                    <input className='form__input'
                           defaultValue={user.email} {...register('email', {
                        required: {
                            value: true,
                            message: 'Field is required'
                        },
                        pattern: {
                            value: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                            message: 'You must enter a valid email '
                        }
                    })}/>
                    {errors.email && <div className='form__error__message'>{errors.email.message}</div>}
                </div>
                <div className='form__section'>
                    <label className='form__label'>Avatar</label>
                    <input className='form__input'
                           defaultValue={user.avatar} {...register('avatar')}/>
                </div>

                <div className='form__button__group'>
                    <button className='button' type="submit">
                        {user.id ? 'Update' : 'Create'}
                    </button>
                    {user.id && (
                        <button className='button button--delete' type="button"
                                onClick={() => setShowConfirmation(true)}>
                            Delete
                        </button>
                    )}
                </div>
            </form>
            {isLoadingDelete || isLoadingUpdate || isLoadingCreate && <Spinner/>}
            {showConfirmation && <ConfirmationCard confirmation={handleDelete} reject={handleBack}/>}
        </div>
    )
}