import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import MyPagination from "../MyPagination/index";
import { ITEM_DETAIL_URL } from "../../constants/route-constants";
import { to_DateTime } from "../../utils";

const itemTable = ({
    tableData,
    currentPage,
    totalPage,
    pageChangeHandler
}) => {
    
    return (
        <div>
            <Table
                striped
                responsive
                bordered
                hover
                size="sm"
                className="mb-3 text-center"
            >
                <thead>
                    <tr>
                        <th width="10">S.No.</th>
                        <th>Item Name</th>
                        <th>Quantity</th>
                        <th>Max Amount(per item)</th>
                        <th>Status</th>
                        <th>Bidding End Time</th>
                        <th>Placed On</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData ? (
                        tableData.length ? (
                            tableData.map((data, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            {(currentPage - 1) * 10 + index + 1}
                                        </td>
                                        <td>
                                            <Link to={ITEM_DETAIL_URL(data.id)}>
                                                {data.name}
                                            </Link>
                                        </td>
                                        <td>{parseInt(data.quantity)}</td>
                                        <td> Rs {parseInt(data.max_amount)}</td>
                                        <td>{data.status}</td>
                                        <td>
                                            {to_DateTime(data.bidding_end_time)}
                                        </td>
                                        <td>{to_DateTime(data.created_at)}</td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={7} className="text-center">
                                    No Data Available
                                </td>
                            </tr>
                        )
                    ) : (
                        <tr>
                            <td colSpan={7} className="text-center">
                                Data Loading...
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <MyPagination
                totalPage={totalPage}
                currentPage={currentPage}
                pageChangeHandler={pageChangeHandler}
            />
        </div>
    );
};

export default itemTable;
