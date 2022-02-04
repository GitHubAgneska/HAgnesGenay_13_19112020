import { useState } from 'react'
import PropTypes from 'prop-types'
import UserNameform from './UserName-form'
import { UserIntroDiv } from './User-intro_style'

const UserIntro = ({ firstName, lastName }) => {
  const [formDisplay, SetFormDisplay] = useState()
  const toggleForm = () => { SetFormDisplay(!formDisplay) }

  return (
    <UserIntroDiv>
      <h1>Welcome back <br /> {firstName} {lastName}!</h1>

      <button onClick={toggleForm}>Edit name</button>

      {formDisplay &&
        <UserNameform firstName={firstName} lastName={lastName} toggleForm={toggleForm} $formDisplay />}

    </UserIntroDiv>
  )
}
UserIntro.defaultProps = {
  formDisplay: false
}
UserIntro.propTypes = { firstName: PropTypes.string, lastName: PropTypes.string }
export default UserIntro
