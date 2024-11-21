"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useWriteContract, useReadContract } from "wagmi";
import { useState, useEffect } from "react";

const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"randNum","type":"uint256"}],"name":"RandomNumberGenerated","type":"event"},{"inputs":[{"internalType":"uint256","name":"_num","type":"uint256"}],"name":"addGumballs","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getGumballs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"playGumballMachine","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const contract = "0x5C443155d6710789F6ba345709e02C73f328FBd3";

export function Contracts() {
    const { writeContract } = useWriteContract();
    const [gumballs, setGumballs] = useState(0);
    const [numAdd, setnumAdd] = useState(0);

    const {data: numGumballs, refetch: refetchGumballs} = useReadContract({
        address: contract,
        abi: ABI,
        functionName: "getGumballs",
        args: []
    });


    async function Play() {
        await writeContract({
            address: contract,
            abi: ABI,
            functionName: "playGumballMachine",
            args: []
        })
    };

    async function Add(numOfGumball: number) {
        await writeContract({
            address: contract,
            abi: ABI,
            functionName: "addGumballs",
            args: [numOfGumball]
        })
    };


    useEffect(() => {
        const interval = setInterval(() => {
          console.log("Checking gumballs");
          refetchGumballs();
        }, 1000);
        
        return () => clearInterval(interval); 
      }, [refetchGumballs]);

    useEffect(() => {
        setGumballs(Number(numGumballs))
    }, [numGumballs]);

    return (
        <div className="p-4 grid grid-cols-1 gap-4 bg-white shadow rounded-lg">
            <div className="text-lg font-semibold">Your Gumballs: {gumballs}</div>
            <Button onClick={() => Play()} style={{ backgroundColor: 'green' }}> PLAY! </Button>
            <Input 
                placeholder="Num?"
                value={numAdd}
                onChange={(e) => setnumAdd(Number(e.target.value))}
                />
            <Button onClick={() => Add(numAdd)}> ADD! </Button>
        </div>
    );

}