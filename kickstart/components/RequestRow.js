import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";
import { Router } from "../routes";

class RequestRow extends Component {
  state = {
    approveLoading: false,
    finalizeLoading: false
  };

  onApprove = async () => {
    const campaign = Campaign(this.props.address);

    this.setState({ approveLoading: true });

    const accounts = await web3.eth.getAccounts();
    await campaign.methods.approveRequest(this.props.id).send({
      from: accounts[0]
    });
    Router.replaceRoute(`/campaigns/${this.props.address}/requests`);

    this.setState({ approveLoading: false });
  };

  onFinalize = async () => {
    const campaign = Campaign(this.props.address);

    this.setState({ finalizeLoading: true });

    const accounts = await web3.eth.getAccounts();
    await campaign.methods.finalizeRequest(this.props.id).send({
      from: accounts[0]
    });
    Router.replaceRoute(`/campaigns/${this.props.address}/requests`);

    this.setState({ finalizeLoading: false });
  };

  render() {
    const { Row, Cell } = Table;
    const { id, request, approversCount } = this.props;
    const readyToFinalize = request.approvalCount > approversCount / 2;

    return (
      <Row
        disabled={request.complete}
        positive={readyToFinalize && !request.complete}
      >
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, "ether")}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>
          {request.approvalCount}/{approversCount}
        </Cell>
        <Cell>
          {request.complete ? null : (
            <Button
              loading={this.state.approveLoading}
              color="green"
              basic
              onClick={this.onApprove}
            >
              Approve
            </Button>
          )}
        </Cell>
        <Cell>
          {request.complete ? null : (
            <Button
              loading={this.state.finalizeLoading}
              color="teal"
              basic
              onClick={this.onFinalize}
            >
              Finalize
            </Button>
          )}
        </Cell>
      </Row>
    );
  }
}

export default RequestRow;
