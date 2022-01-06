import { connect } from "react-redux";

import Items from "./Items";
import { setShowAlert } from "../../redux/actions/alert";
import { addPost, loadPost, updatePost, delPost } from "../../redux/actions/post";

const mapStatetoProps = state => {
  console.log('state', state);
  return {
    user: state.user,
    showAlert: state.showAlert,
    posts:(state.post||{}).posts || []
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setShowAlert: showAlert => {
      dispatch(setShowAlert(showAlert));
    },
    addPost: post => {
      dispatch(addPost(post))
    },
    loadPost: posts => {
      dispatch(loadPost(posts))
    },
    updatePost: (id,post) => {
      dispatch(updatePost(id,post))
    },
    delPost: (id) => {
      dispatch(delPost(id))
    }

  };
};

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(Items);
