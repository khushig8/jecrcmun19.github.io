import React, { useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import BackgroundImage from 'gatsby-background-image'
import Typography from '@material-ui/core/Typography'
import ContentBox from './content-box'
import InputField from './input-field'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Link from '@material-ui/core/Link'

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%',
    maxWidth: '700px',
  },
  radio: {
    root: {
      color: theme.palette.primary.main,
      '&$checked': {
        color: theme.palette.primary.main,
      },
    },
    checked: {},
  },
}))

const committees = ['GA-DISEC', 'UN-SC', 'AIPPM', 'WHA', 'UN-ODC', 'UN-CSW']

const useRadioStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.primary.main,
    '&$checked': {
      color: theme.palette.primary.main,
    },
  },
  checked: {},
}))

function CommitteePreference({ first, second, third }) {
  const classes = useRadioStyles()
  const matches = useMediaQuery('(max-width: 480px)')
  const radioWidth = matches ? 'w-12' : 'w-20'
  return (
    <div>
      <div className='flex justify-end'>
        <div className={radioWidth}>
          <Typography variant='h6' component='p'>
            1st
          </Typography>
        </div>
        <div className={radioWidth}>
          <Typography variant='h6' component='p'>
            2nd
          </Typography>
        </div>
        <div className={radioWidth}>
          <Typography variant='h6' component='p'>
            3rd
          </Typography>
        </div>
      </div>
      {committees.map(name => (
        <div className='flex justify-end items-center'>
          <div className='mr-auto'>
            <Typography variant='subtitle1' component='p'>
              {name}
            </Typography>
          </div>
          <div className={radioWidth}>
            <Radio
              checked={first.value === name}
              name='firstPref'
              classes={classes}
              value={name}
              onChange={first.onChange}
            />
          </div>
          <div className={radioWidth}>
            <Radio
              checked={second.value === name}
              name='secondPref'
              classes={classes}
              value={name}
              onChange={second.onChange}
            />
          </div>
          <div className={radioWidth}>
            <Radio
              checked={third.value === name}
              name='thirdPref'
              classes={classes}
              value={name}
              onChange={third.onChange}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

const FormCompleted = () => (
  <ContentBox className='mb-16'>
    <div>
      <Typography variant='h4' className='my-8' component='h1' paragraph>
        Thank You for Registration
      </Typography>
      <Typography variant='body1' component='p' paragraph>
        Our team will contact you for further information regarding event.
      </Typography>
      <Typography variant='body2' component='p'>
        For more queries, you can contact:
      </Typography>
      <div className='mt-4'>
        <Typography variant='subtitle2' component='p' paragraph>
          Porush Choudhary: <Link href='tel:9413900468'>9413900468</Link>
        </Typography>
      </div>
    </div>
  </ContentBox>
)
export default function DelegatePriorityForm() {
  const classes = useStyles()
  const radioClasses = useRadioStyles()
  const fullName = useForm('')
  const email = useForm('')
  const contact = useForm('')
  const institute = useForm('')
  const classYear = useForm('')
  const expDelegate = useForm('')
  const expEB = useForm('')
  const expSec = useForm('')
  const expOther = useForm('')
  const prefFirst = useForm('')
  const prefSecond = useForm('')
  const prefThird = useForm('')
  const portFirst = useForm('')
  const portSecond = useForm('')
  const portThird = useForm('')
  const accommodation = useForm('no')
  const referral = useForm('')
  const [loading, setLoading] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [error, setError] = useState(false)

  const { image } = useStaticQuery(graphql`
    query {
      image: file(relativePath: { eq: "pages-background.png" }) {
        sharp: childImageSharp {
          fluid(maxWidth: 1080) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)

  const handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    setLoading(true)
    console.log(new FormData(form).entries())
    fetch(
      'https://script.google.com/macros/s/AKfycbz_JnTw8tbJ07ZIaMXkAoTRcs6E6X8DknVyAhxHS4z4sTWO0Oc/exec',
      {
        method: 'POST',
        body: new FormData(form),
      },
    )
      .then(res => {
        console.log(res)
        setLoading(false)
        setCompleted(true)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
        setError(true)
      })
  }
  return (
    <BackgroundImage
      className='flex flex-col justify-center items-center'
      fluid={image.sharp.fluid}
      durationFadeIn={50}
    >
      <ContentBox className='my-16'>
        <div>
          <Typography variant='body1' component='p' paragraph>
            Register before day, Feb date, 2020 to gain priority for acceptance
            and maximize the chance of receiving your country preferences.
          </Typography>
          <Typography variant='body1' component='p' paragraph>
            Conference Date : 11th-12th April 2020
          </Typography>
          <Typography variant='body1' component='p' paragraph>
            Committees to be simulated this year are :
          </Typography>
          <ol className='ml-4 list-decimal'>
            <li>
              <Typography variant='body1' component='p' paragraph>
                United Nations General Assembly-DISEC (GA-DISEC)
              </Typography>
            </li>
            <li>
              <Typography variant='body1' component='p' paragraph>
                United Nations Office on Drugs and Crimes (UN-ODC)
              </Typography>
            </li>
            <li>
              <Typography variant='body1' component='p' paragraph>
                All India Political Parties Meet (AIPPM)
              </Typography>
            </li>
            <li>
              <Typography variant='body1' component='p' paragraph>
                United Nations Commission on the Status of Women (CSW)
              </Typography>
            </li>
            <li>
              <Typography variant='body1' component='p' paragraph>
                United Nations- Security Council (UN-SC)
              </Typography>
            </li>
            <li>
              <Typography variant='body1' component='p' paragraph>
                World Health Assembly (WHA)
              </Typography>
            </li>
          </ol>
        </div>
      </ContentBox>
      {completed ? (
        <FormCompleted />
      ) : (
        <ContentBox className='mb-16'>
          <form className={classes.form} onSubmit={handleSubmit}>
            <InputField
              required
              label='Full Name'
              autoComplete='name'
              name='fullName'
              {...fullName}
            />
            <InputField
              required
              label='Contact No.'
              type='tel'
              name='contact'
              {...contact}
            />
            <InputField
              required
              label='Email ID'
              type='email'
              name='email'
              {...email}
            />
            <InputField
              required
              label='Institution'
              name='institute'
              {...institute}
            />
            <InputField
              required
              label='Class/Year'
              name='classYear'
              {...classYear}
            />
            <div className='mt-8 mb-3'>
              <Typography variant='h6' component='p'>
                Prior MUN Experience
              </Typography>
              <Typography variant='body1' component='p'>
                Please mention the detailed MUN experience in the below format:
                (Name of Conference/ Year /Committee /Position /Awards(if any))
              </Typography>
            </div>
            <InputField
              label='As a Delegate'
              name='expDelegate'
              {...expDelegate}
            />
            <InputField label='As a member of EB' name='expEb' {...expEB} />
            <InputField
              label='As a member of Secretariat'
              name='expSec'
              {...expSec}
            />
            <InputField
              label='Any other experience'
              name='expOther'
              {...expOther}
            />
            <div className='mt-8 mb-3'>
              <Typography variant='h6' component='p'>
                Committee Preferences
              </Typography>
            </div>
            <CommitteePreference
              first={prefFirst}
              second={prefSecond}
              third={prefThird}
            />
            <InputField
              required
              label='Country/Portfolio Preference 1'
              name='port1'
              {...portFirst}
            />
            <InputField
              required
              label='Country/Portfolio Preference 2'
              name='port2'
              {...portSecond}
            />
            <InputField
              required
              label='Country/Portfolio Preference 3'
              name='port3'
              {...portThird}
            />
            <div className='mt-4'>
              <FormControl
                component='fieldset'
                fullWidth
                required
                margin='normal'
              >
                <FormLabel component='legend'>
                  Do You require accommodation ?
                </FormLabel>
                <RadioGroup name='accommodation' {...accommodation}>
                  <FormControlLabel
                    value='yes'
                    control={
                      <Radio classes={radioClasses} name='accommodation' />
                    }
                    label='yes'
                  />
                  <FormControlLabel
                    value='no'
                    control={
                      <Radio classes={radioClasses} name='accommodation' />
                    }
                    label='no'
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <InputField
              required
              label='Referred By'
              name='referred'
              {...referral}
            />
            <div className='mt-6 text-center'>
              {loading ? (
                <CircularProgress />
              ) : (
                <Button
                  type='submit'
                  color='primary'
                  variant='contained'
                  size='large'
                >
                  Register
                </Button>
              )}
              <div>
                {error ? (
                  <Typography variant='h6' component='p' color='error'>
                    Cannot submit form. Please refresh the page and try again.
                  </Typography>
                ) : null}
              </div>
            </div>
          </form>
        </ContentBox>
      )}
    </BackgroundImage>
  )
}

function useForm(initialValue) {
  const [value, setValue] = useState(initialValue)

  const handleChange = e => {
    setValue(e.target.value)
  }
  return { value, onChange: handleChange }
}
