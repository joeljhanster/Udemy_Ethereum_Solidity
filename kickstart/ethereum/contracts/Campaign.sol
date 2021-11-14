pragma solidity ^0.4.17;

// Factory contract to deploy a new instance of Campaign contract
contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint256 minimum) public {
        address newCampaign = new Campaign(minimum, msg.sender); // creates a new contract
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
    // Introduces a new type
    struct Request {
        string description; // Describes why the request is being created
        uint256 value; // Amount of money that the manager wants to send to the vendor
        address recipient; // Address that the money will be sent to (vendor)
        bool complete; // True if the request has already been processed (money sent)
        uint256 approvalCount; // Track number of approvals
        mapping(address => bool) approvals; // Track who has voted
        // Voting mechanism?
    }

    Request[] public requests;
    address public manager;
    uint256 public minimumContribution;
    // address[] public approvers;
    mapping(address => bool) public approvers; // Set true if added, default bool is false (means address not added to mapping)
    uint256 public approversCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function Campaign(uint256 minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);

        // approvers.push(msg.sender);
        approvers[msg.sender] = true; // address (key) not stored, only value is stored
        approversCount++;
    }

    function createRequest(
        string description,
        uint256 value,
        address recipient
    ) public restricted {
        // storage & memory:
        // sometimes references where our contract stores data,
        // sometimes references how our solidity variables store values

        // storage: holds data between function calls (pretty much like a hard drive - long term)
        // memory: temporary place to store data (pretty much like a computer's RAM - short term)

        // storage makes "myArray" variable point directly to same location as "numbers"
        // memory makes a copy of the "numbers" array and copy into memory, "myArray" points to the memory

        // only need to add value type, not reference type (mapping)
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });

        // Not recommended
        // Request(description, value, recipient, false);

        requests.push(newRequest);
    }

    function approveRequest(uint256 index) public {
        // Each approver can only vote once on any given request (need system to keep track of who has voted)
        // Resilient if we have many approvers (thousands)

        // Use mappings instead of arrays (compare gas fees)
        // Every for loop through array costs a lot of gas (avoid arrays whenever possible)
        // Why mapping? Array -> Linear Time Search; Mapping -> Constant Time Search
        // 1. Keys are not stored
        //      a) Hash Tables: Lookup Process ('orange' -> Hashing Function -> index 3 ---> 'naranja')
        // 2. Values are not iterable
        //      a) Only good for single storage lookup
        // 3. "All values exist"
        //      a) Instead of undefined, it will return a default value of type (if we look for a key that does not exist)

        // important to use storage cause we want to reference the same storage
        Request storage request = requests[index];

        require(approvers[msg.sender]); // has contributed
        require(!request.approvals[msg.sender]); // has not voted

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint256 index) public restricted {
        Request storage request = requests[index];

        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);

        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function getSummary()
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            address
        )
    {
        return (
            minimumContribution,
            this.balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequestsCount() public view returns (uint256) {
        return requests.length;
    }
}
