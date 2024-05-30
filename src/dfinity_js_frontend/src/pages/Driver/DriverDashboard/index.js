import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
  Text,
  Img,
  Button,
  NotificationSuccess,
  NotificationError,
  Loader,
} from "../../../components/utils";
import * as Images from "../../../assets/images";
import Wallet from "../../../components/Wallet";
import MaintainanceRecord from "../../maintainanceRecords/MaintainanceRecord";
import {
  createMaintainanceRecord,
  getDriverCompletedOrders,
} from "../../../utils/driver";
import { toast } from "react-toastify";
import { getCompletedDeliveryDetailsForDriver, getDeliveryDetailsPickedUp, getRecentDeliveryDetailsAssignedToDriver, markDeliveryDetailsAsCompleted, markDeliveryDetailsAsPicked } from "../../../utils/deliveries";
import { markProductAsPickedUp } from "../../../utils/product";

export default function DriverDashboard({ driver, fetchDriver }) {
  const [loading, setLoading] = useState(false);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [completeDeliveries, setCompleteDeliveries] = useState([]);
  const [pickedDeliveries, setPickedDeliveries] = useState([]);
  const [activeDelivery, setActiveDelivery] = useState({});
  const [tab, setTab] = useState("completed");

  const { id, maintainanceRecords } = driver;

  const save = async (data) => {
    try {
      setLoading(true);

      createMaintainanceRecord(id, data).then((resp) => {
        fetchDriver();
        toast(<NotificationSuccess text="Maintainance added successfully." />);
      });
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to create a maintainance." />);
    } finally {
      setLoading(false);
    }
  };

  // function to get driver completed orders
  const fetchCompletedOrders = useCallback(async () => {
    try {
      setLoading(true);
      setCompletedOrders(await getDriverCompletedOrders(id));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  });
  // getCompletedDeliveryDetailsForDriver
  const fetchCompletedDelivery = useCallback(async () => {
    try {
      setLoading(true);
      const completedDelivery = await getCompletedDeliveryDetailsForDriver(id);
      console.log("Completed Delivery", completedDelivery);
      setCompleteDeliveries(completedDelivery);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  });

  // getDeliveryDetailsPickedUp
  const fetchPickedDelivery = useCallback(async () => {
    try {
      setLoading(true);
      const pickedDelivery = await getDeliveryDetailsPickedUp(id);
      console.log("Picked Delivery", pickedDelivery);
      setPickedDeliveries(pickedDelivery);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  });


  // get getDriverActiveDelivery
  const fetchActiveDelivery = useCallback(async () => {
    try {
      setLoading(true);
      const activeDelivery = await getRecentDeliveryDetailsAssignedToDriver(id);
      console.log("Active Delivery", activeDelivery.Ok);
      setActiveDelivery(activeDelivery.Ok);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  });

  // markProductAsPickedUp
  const handleMarkProductAsPickedUp = async () => {
    try {
      setLoading(true);
      await markProductAsPickedUp(activeDelivery.productId).then((resp) => {
        markDeliveryDetailsAsPicked(activeDelivery.id)
        fetchActiveDelivery();
        toast(<NotificationSuccess text="Product marked as picked up." />);
      });
      
    } catch (error) {
      console.log(error);
      toast(<NotificationError text="Failed to mark product as picked up." />);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsDelivered = async (deliveryId) => {
    try {
      setLoading(true);
      await markDeliveryDetailsAsCompleted(deliveryId).then((resp => {
        fetchPickedDelivery();
        toast(<NotificationSuccess text="Product marked as Delivered." />);
      }))
    } catch (error) {
      console.log(error);
      toast(<NotificationError text="Failed to mark product as Delivered." />);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPickedDelivery();
    fetchActiveDelivery();
    fetchCompletedDelivery();
  }, []);

  console.log("id", id);
  console.log("activeDelivery", activeDelivery);
  console.log("pickedDeliveries", pickedDeliveries);
  console.log("completeDeliveries", completeDeliveries);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Helmet>
            <title>dApp Hackthon-Javascript</title>
            <meta
              name="description"
              content="Web site created using create-react-app"
            />
          </Helmet>
          <div className="flex flex-row justify-start w-full border-rose-500 bg-gray-200 h-full shadow-sm">
            <div className="flex flex-row justify-start items-start w-full gap-7 mx-auto max-w-[85%]">
              <div className="flex flex-col items-center justify-start w-[100%] mt-[2rem]">
                <div className="h-[361px] w-full z-[1] relative">
                  <div className="flex flex-col items-end justify-center w-full h-full left-0 bottom-0 right-0 top-3 m-auto absolute">
                    <div className="flex flex-col items-start justify-start w-full">
                      <div className="flex flex-col items-start justify-start w-full">
                        <header className="flex flex-col items-center justify-center w-full gap-4 z-[1]">
                          <div className="flex flex-row justify-between items-center w-full">
                            <Text size="7xl" as="p">
                              Driver Overview
                            </Text>
                            <div className="flex flex-row justify-between items-center w-[64%]">
                              <MaintainanceRecord save={save} />
                              <Img
                                src={Images.img_image_399}
                                alt="image399_one"
                                className="w-[6%]  object-cover rounded-[12px]"
                              />
                              <Img
                                src={Images.img_image_386}
                                alt="image386_one"
                                className="w-[6%] object-cover rounded-[12px]"
                              />
                              <Wallet />
                            </div>
                          </div>
                          <div className="flex flex-row justify-between w-full">
                            <div className="flex flex-row justify-between gap-4 items-center w-full">
                              <div className="flex flex-row justify-start w-[38%] p-[22px] bg-white-A700_e0 shadow-xs rounded-[19px]">
                                <div className="flex flex-col items-start justify-start w-[76%] mb-[21px] ml-[3px] gap-[7px]">
                                  <div className="flex gap-4">
                                    <Img
                                      src={Images.img_truck_1}
                                      alt="truckone_one"
                                      className="h-[32px] w-[32px}"
                                    />
                                    <Text
                                      size="3xl"
                                      as="p"
                                      className="ml-[71px] !text-green-700 opacity-0.59"
                                    >
                                      Current Job
                                    </Text>
                                  </div>
                                  <div className="flex flex-row justify-between items-center w-full">
                                    <Text size="4xl" as="p">
                                      {activeDelivery?.pickupDate}
                                    </Text>
                                    <Text size="4xl" as="p">
                                      {activeDelivery?.deliveryPriority}
                                    </Text>
                                  </div>
                                  <Text size="4xl" as="p">
                                    {activeDelivery?.deliveredRegion}
                                  </Text>
                                  <Text size="4xl" as="p">
                                    {activeDelivery?.pickupRegion}
                                  </Text>
                                  <Button
                                    color="blue_gray_900_0c"
                                    size="6xl"
                                    className="rounded-[20px]"
                                    onClick={handleMarkProductAsPickedUp}
                                  >
                                    Mark as Picked
                                  </Button>
                                </div>
                              </div>
                              <div className="flex flex-col items-start justify-start w-[68%] gap-[29px]">
                                <div className="flex flex-row justify-between w-[98%] items-center p-3 bg-white-A700_01 shadow-xs rounded-[25px]">
                                  <Button
                                    color="blue_gray_900_0c"
                                    size="6xl"
                                    className="ml-px rounded-[20px]"
                                    onClick={() => setTab("Picked")}
                                  >
                                    Picked Delivery
                                  </Button>
                                  <Button
                                    color="blue_gray_900_0c"
                                    size="6xl"
                                    className="ml-px rounded-[20px]"
                                    onClick={() => setTab("completed")}
                                  >
                                    Completed Delivery
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </header>
                        <div className="w-full flex flex-row items-center justify-between gap-4">
                          <div className="flex flex-row justify-start items-center w-[38%] mt-4  bg-blue_gray-900_0c shadow-xs rounded-[19px]">
                            <div className="flex flex-row justify-start items-start w-[48%] p-2 mt-2.5 mb-[5px] gap-[11px]">
                              <Img
                                src={Images.img_image_417}
                                alt="image417_one"
                                className="w-[20%] mt-0.5 object-cover rounded-[12px]"
                              />
                              <div className="flex flex-col items-start justify-start w-[73%] gap-1">
                                <Text as="p" className="ml-[5px]">
                                  Expenses
                                </Text>
                                <Text size="4xl" as="p" className="text-center">
                                  $20,850
                                </Text>
                              </div>
                            </div>
                            {/* <div className="flex flex-row justify-start w-[50%] mt-[-89px] p-[17px] bg-blue_gray-900_0c shadow-xs rounded-[19px]"> */}
                            <div className="flex flex-row justify-start items-start w-[48%] p-2 mt-2.5 mb-[5px] gap-[11px]">
                              <Img
                                src={Images.img_image_407}
                                alt="image407_one"
                                className="w-[20%] mt-0.5 object-cover rounded-[12px]"
                              />
                              <div className="flex flex-col items-start justify-start w-[73%] gap-1">
                                <Text as="p" className="ml-[5px]">
                                  Balance
                                </Text>
                                <Text size="4xl" as="p" className="text-center">
                                  $20,850
                                </Text>
                              </div>
                            </div>
                            {/* </div> */}
                          </div>
                          <div className="w-[68%]">
                            
                            <table className="table">
                              <thead className="thead-dark">
                                {tab === "Picked" ? ( 
                                 <>
                                 {pickedDeliveries && pickedDeliveries.map((deliveryDetail, index) => (
                                   <div
                                     key={index}
                                     className="flex flex-row justify-center w-full p-2 bg-white-A700_01 shadow-xs rounded-[12px]"
                                   >
                                     <div className="flex flex-row justify-start items-center w-[95%] gap-[17px]">
                                       <Img
                                         src={Images.img_image_389}
                                         alt="image389_one"
                                         className="w-[86px] object-cover rounded-[12px]"
                                       />
                                       <div className="flex flex-col w-[84%]">
                                         <div className="flex flex-row justify-between items-center">
                                           <Text
                                             size="3xl"
                                             as="p"
                                             className="mb-px "
                                           >
                                             {deliveryDetail.pickupDate}
                                           </Text>
                                           <Text
                                             size="3xl"
                                             as="p"
                                             className="mb-px "
                                           >
                                             {deliveryDetail.pickupRegion}
                                           </Text>
                                           <Text
                                             size="2xl"
                                             as="p"
                                             className="mb-px "
                                           >
                                             {deliveryDetail.deliveredRegion}
                                           </Text>
                                           <Text
                                             size="2xl"
                                             as="p"
                                             className="mb-px "
                                           >
                                             Priority:{deliveryDetail.deliveryPriority}
                                           </Text>
                                           <Text
                                             size="2xl"
                                             as="p"
                                             className="mb-px "
                                           >
                                             {deliveryDetail.deliveryDescription}
                                           </Text>
                                         </div>
                                         <div className="mt-2 flex justify-between items-center">

                                          <Button
                                            color="blue_gray_900_0c"
                                            size="6xl"
                                            className="rounded-[20px]"
                                            onClick={() => handleMarkAsDelivered(deliveryDetail.id)}
                                          >
                                            Mark as Delivered
                                          </Button>

                                           {/* <DeliveryTender deliveryDetail={deliveryDetail} /> */}
                                           
                                           {/* <AssignDrivers
                                             order={deliveryDetail}
                                             save={saveDriver}
                                           /> */}
                                         </div>
                                       </div>
                                     </div>
                                   </div>
                                 ))}
                                 </>
                                ) : tab === "completed" ? (
                                  <>
                                 {completeDeliveries && completeDeliveries.map((deliveryDetail, index) => (
                                   <div
                                     key={index}
                                     className="flex flex-row justify-center w-full p-2 bg-white-A700_01 shadow-xs rounded-[12px]"
                                   >
                                     <div className="flex flex-row justify-start items-center w-[95%] gap-[17px]">
                                       <Img
                                         src={Images.img_image_389}
                                         alt="image389_one"
                                         className="w-[86px] object-cover rounded-[12px]"
                                       />
                                       <div className="flex flex-col w-[84%]">
                                         <div className="flex flex-row justify-between items-center">
                                           <Text
                                             size="3xl"
                                             as="p"
                                             className="mb-px "
                                           >
                                             {deliveryDetail.pickupDate}
                                           </Text>
                                           <Text
                                             size="3xl"
                                             as="p"
                                             className="mb-px "
                                           >
                                             {deliveryDetail.pickupRegion}
                                           </Text>
                                           <Text
                                             size="2xl"
                                             as="p"
                                             className="mb-px "
                                           >
                                             {deliveryDetail.deliveredRegion}
                                           </Text>
                                           <Text
                                             size="2xl"
                                             as="p"
                                             className="mb-px "
                                           >
                                             Priority:{deliveryDetail.deliveryPriority}
                                           </Text>
                                           <Text
                                             size="2xl"
                                             as="p"
                                             className="mb-px "
                                           >
                                             {deliveryDetail.deliveryDescription}
                                           </Text>
                                         </div>
                                        
                                       </div>
                                     </div>
                                   </div>
                                 ))}
                                 </>

                                ):(
                                  <>
                                  </>
                                )}
                              </thead>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-between items-start w-full mt-[-1px] gap-4">
                  <div className="flex flex-col items-start justify-start w-[38%] mt-[29px]">
                    <div className="flex flex-row justify-between items-start w-full">
                      <Text size="4xl" as="p" className="mt-[3px]">
                        Productivity view
                      </Text>
                      <div className="flex flex-row justify-start items-center w-[30%] gap-[18px] p-[5px] border-gray-500_03 border border-solid bg-white-A700_01 shadow-xs rounded-[14px]">
                        <Text as="p" className="ml-[7px] !text-gray-400_02">
                          6 Months
                        </Text>
                        <Img
                          src={Images.img_image_408}
                          alt="image408_one"
                          className="h-[17px] w-[18px] mr-1.5 rounded-[50%]"
                        />
                      </div>
                    </div>
                    <Img
                      src={Images.img_graph}
                      alt="graph_one"
                      className="h-[196px] mt-[35px] ml-[9px}"
                    />
                    <div className="flex flex-row justify-start items-center mt-[13px] ml-2">
                      <Text size="2xl" as="p">
                        Jul
                      </Text>
                      <Text as="p" className="ml-[42px]">
                        Aug
                      </Text>
                      <Text as="p" className="ml-[33px]">
                        Sept
                      </Text>
                      <Text as="p" className="ml-[30px]">
                        Octo
                      </Text>
                      <Text as="p" className="ml-[29px]">
                        Mercedes Nov
                      </Text>
                      <Text as="p" className="ml-[35px]">
                        Dec
                      </Text>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 w-[68%]">
                    {tab === "maintainance" &&
                      maintainanceRecords.map((maintainance, index) => (
                        <div
                          key={index}
                          className="flex flex-row justify-center w-full p-2 bg-white-A700_01 shadow-xs rounded-[12px]"
                        >
                          <div className="flex flex-row justify-start items-center w-[95%] ]">
                            <div className="flex flex-col items-star justify-star w-[84%]">
                              <div className="flex flex-row justify-between items-center">
                                <Text size="3xl" as="p" className="mb-px ">
                                  {maintainance.vehicleRegNo}
                                </Text>
                                <Text size="2xl" as="p" className="mb-px ">
                                  {maintainance.date}
                                </Text>
                                <Text size="2xl" as="p" className="mb-px ">
                                  {maintainance.mechanic}
                                </Text>
                                <Text size="2xl" as="p" className="mb-px ">
                                  {maintainance.mechanicPhone}
                                </Text>
                                <Text size="2xl" as="p" className="mb-px ">
                                  {maintainance.cost}
                                </Text>
                              </div>
                              <div className="flex justify-between">

                              <Text size="2xl" as="p" className="mt-[10px]">
                                desc: {maintainance.description}
                              </Text>
                              <Text size="2xl" as="p" className="mt-[10px]">
                                desc: {maintainance.mechanicAddress}
                              </Text>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    

                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
