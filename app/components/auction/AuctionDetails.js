const AuctionDetails = ({ auction }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        {auction.make} {auction.model} ({auction.year})
      </h1>
      <img
        src={auction.image || "/images/default-car.png"}
        alt={`${auction.make} ${auction.model}`}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <p className="text-gray-600 mb-4">{auction.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-lg font-semibold text-gray-800">
            Starting Price:{" "}
            <span className="text-blue-600">₦{auction.startingPrice}</span>
          </p>
          <p className="text-lg font-semibold text-gray-800">
            Current Bid:{" "}
            <span className="text-blue-600">₦{auction.currentBid}</span>
          </p>
        </div>
        <div>
          <p className="text-lg font-semibold text-gray-800">
            Auction Start:{" "}
            <span className="text-blue-600">
              {new Date(auction.startTime?.toDate()).toLocaleString()}
            </span>
          </p>
          <p className="text-lg font-semibold text-gray-800">
            Auction End:{" "}
            <span className="text-blue-600">
              {new Date(auction.endTime?.toDate()).toLocaleString()}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuctionDetails;
