import React, { Fragment, useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  clearBidStatusChange,
  getBidDetails,
  likePlacedBid,
  rejectPlacedBid,
} from '../../redux/actions/bidActions';
import { clearError, clearNotFound } from '../../redux/actions/userActions';
import Error404 from '../../components/Error404';
import BidDetailsForm from '../../components/BidDetailsForm';
import { Alert, Button, Modal } from 'react-bootstrap';
import Loading from '../../components/Loading';
import { PENDING } from '../../constants/common-constants';

const BidDetails = (props) => {
  const itemId = props.match.params.itemId;
  const bidId = props.match.params.id;
  const dispatchAction = useDispatch();

  const { bid, notFound, error, bidStatusChange } = useSelector(
    (state) => ({
      bid: state.bidReducer.bid,
      notFound: state.userReducer.notFound,
      error: state.userReducer.error,
      bidStatusChange: state.bidReducer.bidStatusChange,
    }),
    shallowEqual
  );
  const [rejectModalShow, setRejectModalShow] = useState(false);
  const [alert, setAlert] = useState(false);
  const [bufferEndTime, setBufferEndTime] = useState(false);

  useEffect(() => {
    dispatchAction(clearBidStatusChange());
    dispatchAction(clearNotFound());
    dispatchAction(clearError());
  }, [dispatchAction]);

  useEffect(() => {
    // (Object.keys(emptyObj).length === 0)
    if (error && error.message) setAlert(true);
    else setAlert(false);
  }, [error]);

  useEffect(() => {
    if (bidStatusChange) dispatchAction(getBidDetails(itemId, bidId));
  }, [bidStatusChange, dispatchAction, itemId, bidId]);

  useEffect(() => {
    dispatchAction(getBidDetails(itemId, bidId));
  }, [dispatchAction, itemId, bidId]);

  useEffect(() => {
    if (bid && new Date(bid.buffer_end_time) > new Date()) {
      setBufferEndTime(true);
    }
  }, [bid]);

  const handleReject = () => {
    setRejectModalShow(!rejectModalShow);
  };

  const handleRejectSubmit = () => {
    if (error) dispatchAction(clearError());
    if (bidStatusChange) dispatchAction(clearBidStatusChange());
    dispatchAction(rejectPlacedBid(itemId, bidId));
    handleReject();
  };

  const handleLike = () => {
    if (error) dispatchAction(clearError());
    dispatchAction(likePlacedBid(itemId, bidId));
  };

  const rejectModal = (
    <Modal show={rejectModalShow} onHide={handleReject} backdrop="static">
      <Modal.Header closeButton>Reject Seller Bid</Modal.Header>
      <Modal.Body className="d-flex justify-content-center">
        <Button className="btn-danger" onClick={handleRejectSubmit}>
          Confirm Reject
        </Button>
      </Modal.Body>
    </Modal>
  );

  if (notFound) {
    return <Error404 />;
  }

  return (
    <Fragment>
      {alert && (
        <Alert
          variant="danger"
          className="fixed-top"
          onClose={() => dispatchAction(clearError())}
          dismissible
        >
          {error.message}
        </Alert>
      )}
      {bid && bid.id ? (
        <div className="container">
          <div className="p-5 my-5 rounded-lg shadow">
            <h2 className="pb-3 text-primary">
              <u>Bid Details</u>
            </h2>
            <BidDetailsForm bid={bid} />
            {!bid.bid_owner && bufferEndTime ? (
              bid.status === PENDING ? (
                <Fragment>
                  {bid.isLiked ? (
                    <Button className="btn-success col-1 mx-2" disabled>
                      Liked
                    </Button>
                  ) : (
                    <Button
                      className="btn-success col-1 mx-2"
                      onClick={handleLike}
                    >
                      Like
                    </Button>
                  )}
                  <Button
                    className="btn-danger col-1 mx-2"
                    onClick={handleReject}
                  >
                    Reject
                  </Button>
                </Fragment>
              ) : null
            ) : null}
          </div>
          {rejectModal}
        </div>
      ) : (
        <Loading />
      )}
    </Fragment>
  );
};

export default BidDetails;
