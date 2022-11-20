import './style.less';
import classnames from "classnames";
export const Button = ({title, ...props}) => {
    return (
        <button className={classnames('button', { ['button--disabled']: props.disabled })} {...props}>{title}</button>
    )
}