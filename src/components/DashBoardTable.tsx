import { Archive, Delete, EllipsisVertical } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { dataArray, DataArrayInterface } from '../store/SaveData';
import { useNavigate } from 'react-router-dom';

function DashBoardTable() {
  const head = ['name', 'location', 'auther', 'created'];
  const data = useRecoilValue(dataArray);
  return (
    <div className="h-[90%]">
      <div className='h-[3rem] w-full bg-gray-900 grid grid-cols-4'>
        {
          head.map((v, _) => (
            <div key={v} className='flex justify-center items-center'>
              <div className='cursor-pointer'>
                {v}
              </div>
            </div>
          ))
        }
      </div>
      <div className='overflow-hidden overflow-y-scroll h-[90%] border-t-[1px]'>
        {
          data.map((v, _) => {
            return (
              <EachRow key={v.id} v={v} />
            )
          })
        }
      </div>
    </div>
  )
}

export default DashBoardTable

const EachRow = ({ v }: { v: DataArrayInterface }) => {
  const navigate = useNavigate();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const date = new Date(v.createdAt);
  const formattedDate = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  const handelClick = () => {
    navigate(`/editor/${v.id}`)
  }
  return (
    <div key={v.id} onClick={handelClick} className='grid grid-cols-4 h-[5rem] cursor-pointer hover:bg-gray-500'>
      <ContentCenter><div>{v.filename}</div></ContentCenter>
      <ContentCenter><div>{v.location}</div></ContentCenter>
      <ContentCenter>
        <div>
          <img
            src={
              v?.authorPic ??
              "https://img.freepik.com/free-vector/graphic-designer-man_78370-159.jpg?size=626&ext=jpg&ga=GA1.1.1395880969.1709251200&semt=ais"
            }
            alt="logo"
            className="w-8 h-8 rounded-full object-cover cursor-pointer"
          />
        </div>
      </ContentCenter>
      <div className='flex justify-center'>
        <div className='flex justify-between items-center w-[50%]'>
          <div className=' '>{formattedDate}</div>
          <ClickDiv fileID={v.id} />
        </div>
      </div>
    </div>
  )
}


const ClickDiv = ({ fileID }: { fileID: string }) => {
  const [data,setData] = useRecoilState(dataArray);
  const [showOp, setShowOp] = useState(false);
  const archiveFile = useCallback(async () => {

  }, []);
  const deleteFile = useCallback(async () => {
    const newdata=[];
    for (const d of data) {
      if (d.id!==fileID) {
        newdata.push(d)
      }
    }
    setData(newdata);
    try {
      await fetch(`https://eraser_clone.mustafaimrankhan9.workers.dev/file/${fileID}`,{
        method:'DELETE',
      });
    } catch (error) {
      console.log(error)
    }
  }, []);
  return (
    <button onClick={(e) => { e.stopPropagation(); setShowOp(p => !p) }} onBlur={() => setShowOp(false)} className='p-2 hover:bg-slate-800 relative'>
      <EllipsisVertical size={16} />
      <div className={`${showOp ? 'absolute' : 'hidden'} space-y-1 bg-black p-2 rounded-md w-[10rem] top-[30px] right-[5px]`}>
        <div onClick={archiveFile} className='hover:bg-gray-800 flex justify-between items-center'><Archive size={16} /><span>archive</span></div>
        <div onClick={deleteFile} className='hover:bg-red-700 flex justify-between items-center'><Delete size={16} /><span>delete</span></div>
      </div>
    </button>
  )
}

const ContentCenter = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex justify-center items-center'>
      {children}
    </div>
  );
}

// array code
/*
{
  Array.from({ length: 30 }).map((_, i) => (
    <div key={i} className='grid grid-cols-4 h-[5rem] cursor-pointer hover:bg-gray-500'>
      <ContentCenter><div>fileName{i}</div></ContentCenter>
      <ContentCenter><div>location{i}</div></ContentCenter>
      <ContentCenter><div>Author{i}</div></ContentCenter>
      <div className='flex justify-center'>
        <div className='flex justify-between items-center w-[50%]'>
          <div className=' '>created{i}</div>
          <ClickDiv/>
        </div>
      </div>
    </div>
  ))
}
*/