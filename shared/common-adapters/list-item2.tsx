import * as React from 'react'
import * as Styles from '../styles'
import ClickableBox from './clickable-box'
import {Box2} from './box'
import BoxGrow from './box-grow'
import Divider from './divider'

const Kb = {
  Box2,
  BoxGrow,
  ClickableBox,
  Divider,
}

// List item following stylesheet specs. TODO deprecate list-item.*.js

type Props = {
  type: 'Small' | 'Large'
  icon: React.ReactNode
  statusIcon?: React.ReactNode
  body: React.ReactNode
  firstItem: boolean
  action?: React.ReactNode
  // If 'grow' is used, the width of action cannot exceed 64. If larger width
  // is needed, bump the `maxWidth: 64` below to a larger value. Note that if
  // it's too large, the animation would also seem much faster.
  onlyShowActionOnHover?: 'fade' | 'grow' | null
  onClick?: () => void
}

const HoverBox = Styles.isMobile
  ? Box2
  : Styles.styled(Box2)({
      // @ts-ignore
      '.fade': {
        opacity: 0,
        ...Styles.transition('opacity'),
      },
      '.grow': {
        maxWidth: 0,
        overflow: 'hidden',
        ...Styles.transition('max-width'),
      },
      ':hover': {
        backgroundColor: Styles.globalColors.blueLighter2,
      },
      ':hover .avatar-border': {
        // TODO: it'd be nice to move this out of this file since list-item2
        // has nothing todo with avatars. We'd need Kb.AvatarLine to know
        // about different background and set that on hover though.
        boxShadow: `0px 0px 0px 2px ${Styles.globalColors.blueLighter2} !important`,
      },
      ':hover .fade': {
        opacity: 1,
      },
      ':hover .grow': {
        maxWidth: 64,
      },
    })

const containerStyle = (props: Props) =>
  props.type === 'Small'
    ? props.statusIcon
      ? styles.contentContainerSmallWithStatusIcon
      : styles.contentContainerSmall
    : props.statusIcon
    ? styles.contentContainerLargeWithStatusIcon
    : styles.contentContainerLarge
const iconStyle = (props: Props) =>
  props.type === 'Small'
    ? props.statusIcon
      ? styles.iconSmallWithStatusIcon
      : styles.iconSmall
    : props.statusIcon
    ? styles.iconLargeWithStatusIcon
    : styles.iconLarge

const ListItem = (props: Props) => (
  <Kb.ClickableBox
    onClick={props.onClick}
    style={props.type === 'Small' ? styles.clickableBoxSmall : styles.clickableBoxLarge}
  >
    <HoverBox
      direction="horizontal"
      style={props.type === 'Small' ? styles.rowSmall : styles.rowLarge}
      fullWidth={true}
    >
      {props.statusIcon && (
        <Kb.Box2 direction="vertical" style={styles.statusIcon} alignItems="flex-end">
          {props.statusIcon}
        </Kb.Box2>
      )}
      <Kb.Box2 direction="vertical" style={iconStyle(props)} centerChildren={true}>
        {props.icon}
      </Kb.Box2>
      <Kb.Box2 direction="horizontal" style={containerStyle(props)}>
        {!props.firstItem && <Divider style={styles.divider} />}
        <Kb.BoxGrow>
          <Kb.Box2
            direction="horizontal"
            style={props.type === 'Small' ? styles.bodySmallContainer : styles.bodyLargeContainer}
          >
            {props.body}
          </Kb.Box2>
        </Kb.BoxGrow>
        <Kb.Box2
          direction="horizontal"
          className={Styles.classNames({
            fade: props.onlyShowActionOnHover === 'fade',
            grow: props.onlyShowActionOnHover === 'grow',
          })}
          style={Styles.collapseStyles([
            props.type === 'Small' ? styles.actionSmallContainer : styles.actionLargeContainer,
            props.onlyShowActionOnHover === 'grow' && styles.actionFlexEnd,
          ])}
        >
          {props.action}
        </Kb.Box2>
      </Kb.Box2>
    </HoverBox>
  </Kb.ClickableBox>
)

export const smallHeight = Styles.isMobile ? 56 : 48
export const largeHeight = Styles.isMobile ? 64 : 56
const smallIconWidth = Styles.isMobile ? 56 : 56
const largeIconWidth = Styles.isMobile ? 72 : 72
const statusIconWidth = Styles.isMobile ? 32 : 32
const styles = Styles.styleSheetCreate({
  actionFlexEnd: {
    // This provides the correct behavior for grow where the actions show up
    // and the content slides left from on top of the actions.
    justifyContent: 'flex-end',
  },
  actionLargeContainer: {
    alignItems: 'center',
    flexGrow: 0,
    flexShrink: 0,
    justifyContent: 'flex-start',
    marginRight: 8,
    position: 'relative',
  },
  actionSmallContainer: {
    alignItems: 'center',
    flexGrow: 0,
    flexShrink: 0,
    justifyContent: 'flex-start',
    marginRight: 8,
    position: 'relative',
  },
  bodyLargeContainer: {
    alignItems: 'center',
    flexGrow: 1,
    flexShrink: 1,
    justifyContent: 'flex-start',
    maxWidth: '100%',
    minHeight: largeHeight,
    position: 'relative',
  },
  bodySmallContainer: {
    alignItems: 'center',
    flexGrow: 1,
    flexShrink: 1,
    justifyContent: 'flex-start',
    maxWidth: '100%',
    minHeight: smallHeight,
    position: 'relative',
  },
  clickableBoxLarge: {
    flexShrink: 0,
    minHeight: largeHeight,
    width: '100%',
  },
  clickableBoxSmall: {
    flexShrink: 0,
    minHeight: smallHeight,
    width: '100%',
  },
  // Using margin and keeping the icon on the let using absolute is to work around an issue in RN where
  // the nested views won't grow and still retain their widths correctly
  contentContainerLarge: {
    flexGrow: 1,
    marginLeft: largeIconWidth,
    minHeight: largeHeight,
    position: 'relative',
  },
  contentContainerLargeWithStatusIcon: {
    flexGrow: 1,
    marginLeft: largeIconWidth + statusIconWidth,
    minHeight: largeHeight,
    position: 'relative',
  },
  contentContainerSmall: {
    flexGrow: 1,
    marginLeft: smallIconWidth,
    minHeight: smallHeight,
    position: 'relative',
  },
  contentContainerSmallWithStatusIcon: {
    flexGrow: 1,
    marginLeft: smallIconWidth + statusIconWidth,
    minHeight: smallHeight,
    position: 'relative',
  },
  divider: {
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  iconLarge: {
    position: 'absolute',
    width: Styles.isMobile ? 75 : 72,
  },
  iconLargeWithStatusIcon: {
    left: statusIconWidth,
    position: 'absolute',
    width: Styles.isMobile ? 75 : 72,
  },
  iconSmall: {
    position: 'absolute',
    width: Styles.isMobile ? 60 : 56,
  },
  iconSmallWithStatusIcon: {
    left: statusIconWidth,
    position: 'absolute',
    width: Styles.isMobile ? 60 : 56,
  },
  rowLarge: {
    alignItems: 'center',
    minHeight: largeHeight,
    position: 'relative',
  },
  rowSmall: {
    alignItems: 'center',
    minHeight: smallHeight,
    position: 'relative',
  },
  statusIcon: {
    position: 'absolute',
    width: statusIconWidth,
  },
})

export default ListItem
