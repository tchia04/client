import * as React from 'react'
import * as Kb from '../../common-adapters'
import * as Styles from '../../styles'

export type Props = {
  onReadMore: () => void
  onHideChatBanner: () => void
}

const Banner = ({onReadMore, onHideChatBanner}: Props) => (
  <Kb.Box style={styles.containerBanner}>
    <Kb.Icon type={Styles.isMobile ? 'icon-illustration-teams-216' : 'icon-illustration-teams-180'} />
    <Kb.Box style={styles.containerHeader}>
      <Kb.Text negative={true} type="Header" style={styles.header}>
        Now supporting teams!
      </Kb.Text>
      <Kb.Text center={Styles.isMobile} negative={true} type="BodySmallSemibold" style={styles.text}>
        Keybase team chats are encrypted - unlike Slack - and work for any size group, from casual friends to
        large communities.
      </Kb.Text>
      <Kb.Text negative={true} type="BodySmallSemiboldPrimaryLink" className="underline" onClick={onReadMore}>
        Read our announcement
      </Kb.Text>
    </Kb.Box>
    <Kb.Box style={styles.closeIconContainer}>
      <Kb.Icon
        type="iconfont-close"
        style={{padding: Styles.globalMargins.xtiny}}
        onClick={onHideChatBanner}
      />
    </Kb.Box>
  </Kb.Box>
)

const styles = Styles.styleSheetCreate({
  closeIcon: {
    padding: Styles.globalMargins.xtiny,
  },
  closeIconContainer: Styles.platformStyles({
    common: {
      position: 'absolute',
    },
    isElectron: {
      right: Styles.globalMargins.tiny,
      top: Styles.globalMargins.tiny,
    },
    isMobile: {
      height: 26,
      right: Styles.globalMargins.small,
      top: Styles.globalMargins.small,
      width: 26,
    },
  }),
  containerBanner: Styles.platformStyles({
    common: {
      alignItems: 'center',
      backgroundColor: Styles.globalColors.blue,
      flexShrink: 0,
      justifyContent: 'center',
      position: 'relative',
      width: '100%',
    },
    isElectron: {
      ...Styles.globalStyles.flexBoxRow,
      height: 212,
    },
    isMobile: {
      ...Styles.globalStyles.flexBoxColumn,
      padding: 24,
    },
  }),
  containerHeader: Styles.platformStyles({
    common: {
      ...Styles.globalStyles.flexBoxColumn,
    },
    isElectron: {
      marginLeft: Styles.globalMargins.medium,
      maxWidth: 330,
    },
    isMobile: {
      alignItems: 'center',
    },
  }),
  header: {
    marginBottom: 15,
    marginTop: 15,
  },
  text: Styles.platformStyles({
    common: {
      marginBottom: Styles.globalMargins.small,
    },
  }),
})

export default Banner
