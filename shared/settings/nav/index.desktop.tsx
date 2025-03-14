import * as React from 'react'
import * as Constants from '../../constants/settings'
import {globalStyles, globalColors, globalMargins, platformStyles, styleSheetCreate} from '../../styles'
import {Box} from '../../common-adapters'
import SettingsItem from './settings-item'

import {Props} from './index'

function SettingsNav(props: Props) {
  return (
    <Box style={styles.container}>
      <SettingsItem
        text="Your account"
        selected={props.selectedTab === Constants.landingTab}
        onClick={() => props.onTabChange(Constants.landingTab)}
      />
      <SettingsItem
        text="Chat"
        selected={props.selectedTab === Constants.chatTab}
        onClick={() => props.onTabChange(Constants.chatTab)}
      />
      <SettingsItem
        text="Files"
        selected={props.selectedTab === Constants.fsTab}
        onClick={() => props.onTabChange(Constants.fsTab)}
      />
      <SettingsItem
        text="Notifications"
        selected={props.selectedTab === Constants.notificationsTab}
        onClick={() => props.onTabChange(Constants.notificationsTab)}
      />
      <SettingsItem
        text="Feedback"
        selected={props.selectedTab === Constants.feedbackTab}
        onClick={() => props.onTabChange(Constants.feedbackTab)}
      />
      <SettingsItem
        text="Invitations"
        selected={props.selectedTab === Constants.invitationsTab}
        onClick={() => props.onTabChange(Constants.invitationsTab)}
      />
      <SettingsItem
        text="Advanced"
        selected={props.selectedTab === Constants.advancedTab}
        onClick={() => props.onTabChange(Constants.advancedTab)}
      />
      <SettingsItem
        text="Delete me"
        selected={props.selectedTab === Constants.deleteMeTab}
        onClick={() => props.onTabChange(Constants.deleteMeTab)}
      />
      {/* TODO: Do something with logoutInProgress once Offline is
        removed from the settings page. */}
      <SettingsItem text="Sign out" selected={false} onClick={() => props.onTabChange(Constants.logOutTab)} />
    </Box>
  )
}

const styles = styleSheetCreate({
  container: platformStyles({
    common: {
      ...globalStyles.flexBoxColumn,
      backgroundColor: globalColors.white,
      paddingTop: globalMargins.small,
      width: 160,
    },
    isElectron: {
      borderRight: `1px solid ${globalColors.black_10}`,
    },
  }),
})

export default SettingsNav
