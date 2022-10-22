import {FC} from "react";
import '../assets/styles/confirmation.css'
interface IConfirmationCardProps {
    confirmation: () => void;
    reject: () => void;
}

export const ConfirmationCard: FC<IConfirmationCardProps> = ({confirmation, reject}) => {
    return (
        <div className='confirmation__card'>
            <div className='confirmation__card__container'>
                <div className='confirmation__card__container__title'>
                   <h3> Confirmation</h3>
                </div>
                <div className='confirmation__card__container__body'>
                    <p>Are you sure?</p>
                </div>
                <div className='confirmation__card__container__buttonGroup'>
                    <button className='button button--delete' onClick={reject}>No</button>
                    <button className='button' onClick={confirmation}>Yes</button>
                </div>
            </div>
        </div>
    )
}