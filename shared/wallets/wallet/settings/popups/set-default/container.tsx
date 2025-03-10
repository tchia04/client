import * as Container from '../../../../../util/container'
import * as Constants from '../../../../../constants/wallets'
import * as Types from '../../../../../constants/types/wallets'
import * as WalletsGen from '../../../../../actions/wallets-gen'
import * as RouteTreeGen from '../../../../../actions/route-tree-gen'
import {anyWaiting} from '../../../../../constants/waiting'
import SetDefaultAccountPopup from '.'

type OwnProps = Container.RouteProps<{accountID: Types.AccountID}, {}>

const mapStateToProps = (state: Container.TypedState, ownProps: OwnProps) => {
  const accountID = Container.getRouteProps(ownProps, 'accountID')

  return {
    accountID,
    accountName: Constants.getAccount(state, accountID).name,
    username: state.config.username,
    waiting: anyWaiting(state, Constants.setAccountAsDefaultWaitingKey),
  }
}
const mapDispatchToProps = (dispatch: Container.TypedDispatch) => ({
  _onAccept: (accountID: Types.AccountID) =>
    dispatch(
      WalletsGen.createSetAccountAsDefault({
        accountID,
      })
    ),
  _onClose: () => dispatch(RouteTreeGen.createNavigateUp()),
})

export default Container.namedConnect(
  mapStateToProps,
  mapDispatchToProps,
  (stateProps, dispatchProps) => ({
    accountName: stateProps.accountName,
    onAccept: () => dispatchProps._onAccept(stateProps.accountID),
    onClose: () => dispatchProps._onClose(),
    username: stateProps.username,
    waiting: stateProps.waiting,
  }),
  'SetDefaultAccountPopup'
)(SetDefaultAccountPopup)
