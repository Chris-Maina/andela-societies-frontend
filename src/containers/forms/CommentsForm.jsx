import React, { Component } from 'react';
import { connect } from 'react-redux';

// third party libraries
import PropTypes from 'prop-types';

// components
import Button from '../../common/Button';
import TextArea from '../../common/TextArea';
import TextContent from '../../common/TextContent';
import FormError from '../../components/formErrors/FormError';
import SnackBar from '../../components/notifications/SnackBar';

// thunk
import { verifyRedemption } from '../../actions/verifyRedemptionActions';
import { requestMoreInfo } from '../../actions/commentActions';

// helpers
import validateFormFields from '../../helpers/validateForm';
import pointsToDollarConverter from '../../../src/helpers/pointsToDollarsConverter';

// fixtures
import { moreInfoText, rejectionText } from '../../fixtures/commentsFormText';

// constants
import clickActions from '../../constants/clickAction';

class CommentsForm extends Component {
  static defaultProps = {
    message: {
      type: '',
      text: '',
    },
    selectedItem: {},
    closeModal: null,
    requestMoreInfo: null,
    verifyRedemption: null,
  };
  /**
   * @name propTypes
   */
  static propTypes = {
    selectedItem: PropTypes.shape({ id: PropTypes.string }),
    verifyRedemption: PropTypes.func,
    requestMoreInfo: PropTypes.func,
    closeModal: PropTypes.func,
    message: PropTypes.shape({
      type: PropTypes.string,
      text: PropTypes.string,
    }),
  }

  static getDerivedStateFromProps = (props, state) => {
    if (props.selectedItem.rejectClicked) {
      return {
        ...rejectionText,
      };
    }
    return state;
  }

  constructor(props) {
    super(props);
    this.state = {
      ...moreInfoText,
      comment: '',
      errors: [],
    };
  }

  /**
   * @function componentDidUpdate
   * @summary Closes model after showing success message
   * @param {Object} prevProps
   */
  componentDidUpdate(prevProps) {
    if (prevProps.message.type !== this.props.message.type) {
      if (this.props.message.type === 'success') {
        setTimeout(() => this.handleCloseModal(), 3200);
      }
    }
  }

  /**
   * @name handleChange
   * @summary handles chnage event for form inputs
   * @param {Object} event
   */
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState(() => ({ [name]: value }));

    if (!this.state[value]) {
      const errors = this.state.errors.filter(error => (error !== name));
      this.setState({ errors });
    }
  }

  /**
   * @name handleSubmit
   * @summary handles submit form event
   * @returns {void}
   */
  handleSubmit = () => {
    const { comment } = this.state;
    const { MORE_INFO, REJECT } = clickActions;
    const { selectedItem } = this.props;
    const errors = validateFormFields({ comment });
    const clickAction = selectedItem.rejectClicked ? REJECT : MORE_INFO;
    if (errors.length) {
      this.setState({ errors });
    } else if (selectedItem.itemType === 'redemption') {
      this.props.verifyRedemption(selectedItem.id, clickAction, comment);
    } else if (selectedItem.itemType === 'activity') {
      this.props.requestMoreInfo(selectedItem.id, comment);
    }
  }

  /**
   * @name resetState
   * @summary resets state to initial values
   */
  resetState = () => {
    this.setState({
      ...moreInfoText,
      comment: '',
      errors: [],
    });
  }

  /**
   * @name handleCloseModal
   * @summary handles the closing of the modal
   */
  handleCloseModal = () => {
    this.props.closeModal();
    this.resetState();
  }

  /**
   * @name renderItemDetails
   * @param {Object} selectedItem redemption/activity whose reject button has been clicked
   * @summary display details of selected item
   */
  renderItemDetails = (selectedItem) => {
    const {
      center,
      name,
      value,
      society,
      category,
      points,
      owner,
      description,
    } = selectedItem;

    let fields;
    switch (selectedItem.itemType) {
    case 'activity':
      fields = {
        category,
        points: points.toString(),
        description,
        owner,
        society: society.name,
      };
      break;
    case 'redemption':
      fields = {
        society: society.name,
        center: center.name,
        points: value.toString(),
        amount: `$${pointsToDollarConverter(value)}`,
        reason: name,
      };
      break;
    default:
      return null;
    }
    const displayNodes = Object.keys(fields).map(field =>
      <TextContent name={field} content={fields[field]} key={field} />);
    return displayNodes;
  }

  render() {
    const { message, selectedItem } = this.props;
    const {
      buttonText,
      comment,
      errors,
      placeholderText,
      title,
    } = this.state;
    return (
      <form>
        <div className='titleForm titleForm--comment'>{title}</div>
        {
          Object.keys(selectedItem).length && this.renderItemDetails(selectedItem)
        }
        <TextArea
          title='Comment'
          rows={5}
          resize={false}
          name='comment'
          value={comment}
          placeholder={placeholderText}
          handleChange={this.handleChange}
        />
        <FormError errors={errors} fieldName='comment' />
        <Button
          name='rejectionButtonSubmit'
          value={buttonText}
          className='submitButton'
          onClick={this.handleSubmit}
        />
        <Button
          name='rejectionButtonCancel'
          value='Cancel'
          className='cancelButton'
          onClick={this.handleCloseModal}
        />
        {
          message && <SnackBar message={message} />
        }
      </form>
    );
  }
}

const mapStateToProps = state => ({
  message: state.commentsInfo.message,
});

export default connect(mapStateToProps, {
  verifyRedemption,
  requestMoreInfo,
})(CommentsForm);
