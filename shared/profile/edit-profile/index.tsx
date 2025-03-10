import * as Constants from '../../constants/tracker2'
import * as Kb from '../../common-adapters'
import * as React from 'react'
import * as Styles from '../../styles'

const maxBio = 255

type Props = {
  bio: string
  fullname: string
  location: string
  title: string
  onCancel: () => void
  onSubmit: (bio: string, fullname: string, location: string) => void
}

type State = {
  bio: string
  fullname: string
  location: string
}

// TODO move this concept to common adapters
const RoundedBox = ({side, children}) => (
  <Kb.Box2
    direction="vertical"
    style={Styles.collapseStyles([
      side === 'top' && styles.roundedBoxTop,
      side === 'bottom' && styles.roundedBoxBottom,
      side === 'middle' && styles.roundedBoxMiddle,
    ])}
  >
    {children}
  </Kb.Box2>
)

class EditProfile extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      bio: props.bio,
      fullname: props.fullname,
      location: props.location,
    }
  }

  _disabled = () => {
    return (
      (this.state.bio === this.props.bio &&
        this.state.fullname === this.props.fullname &&
        this.state.location === this.props.location) ||
      this.state.bio.length >= maxBio
    )
  }

  _updateFullname = fullname => this.setState({fullname})
  _updateBio = bio => this.setState({bio})
  _updateLocation = location => this.setState({location})

  _submit = () => {
    this.props.onSubmit(this.state.bio, this.state.fullname, this.state.location)
  }

  // TODO use NewInput when that supports better border radius changes
  render() {
    return (
      <Kb.ScrollView>
        <Kb.Box2 fullWidth={true} direction="vertical" style={styles.container}>
          {Styles.isMobile ? null : (
            <Kb.Text type="Header" style={styles.header}>
              Edit Profile
            </Kb.Text>
          )}
          <RoundedBox side="top">
            <Kb.PlainInput
              value={this.state.fullname}
              placeholder="Full name"
              autoFocus={true}
              onChangeText={this._updateFullname}
            />
          </RoundedBox>
          <RoundedBox side="middle">
            <Kb.PlainInput
              value={this.state.bio}
              placeholder="Bio"
              multiline={true}
              rowsMin={7}
              rowsMax={7}
              onChangeText={this._updateBio}
            />
          </RoundedBox>
          <RoundedBox side="bottom">
            <Kb.PlainInput
              value={this.state.location}
              placeholder="Location"
              onChangeText={this._updateLocation}
              onEnterKeyDown={this._submit}
            />
          </RoundedBox>
          <Kb.Box2 direction="vertical" style={styles.gap} />
          <Kb.WaitingButton
            waitingKey={Constants.waitingKey}
            label="Save"
            disabled={this._disabled()}
            onClick={this._submit}
          />
          {this.state.bio.length > maxBio && <Kb.Text type="BodySmallError">Bio too long, sorry</Kb.Text>}
        </Kb.Box2>
      </Kb.ScrollView>
    )
  }
}

const roundedBox: Styles.StylesCrossPlatform = {
  alignSelf: 'stretch',
  borderBottomWidth: 1,
  borderColor: Styles.globalColors.greyDark,
  borderLeftWidth: 1,
  borderRightWidth: 1,
  borderStyle: 'solid',
  borderTopWidth: 1,
  padding: Styles.globalMargins.small,
}
const styles = Styles.styleSheetCreate({
  bio: {
    maxHeight: undefined,
  },
  container: Styles.platformStyles({
    common: {
      padding: Styles.globalMargins.small,
    },
    isElectron: {
      height: 450,
      width: 350,
    },
  }),
  gap: {flexGrow: 1, minHeight: Styles.globalMargins.small},
  header: {marginBottom: Styles.globalMargins.small},
  roundedBoxBottom: {
    ...roundedBox,
    borderBottomLeftRadius: Styles.borderRadius,
    borderBottomRightRadius: Styles.borderRadius,
  },
  roundedBoxMiddle: {
    ...roundedBox,
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  roundedBoxTop: {
    ...roundedBox,
    borderTopLeftRadius: Styles.borderRadius,
    borderTopRightRadius: Styles.borderRadius,
  },
})

export default Kb.HeaderOrPopupWithHeader(EditProfile)
