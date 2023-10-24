import {FC, PropsWithChildren} from 'react';
import module from './EmptyTable.module.scss';

interface EmptyTableI extends PropsWithChildren {
}

const EmptyTable: FC<EmptyTableI> = ({children}) => {

    return (
        <div className={module.emptyTable}>
                <h2 className={module.emptyTable_message}>
                    {children}
                </h2>
        </div>
    )
}

export default EmptyTable;