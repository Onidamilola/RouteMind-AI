import { NextRequest, NextResponse } from "next/server";
import { SHIPMENTS, findShipment } from "@/data/shipments";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const trackingId = searchParams.get("id");

  if (trackingId) {
    const shipment = findShipment(trackingId);
    if (!shipment) {
      return NextResponse.json({ error: "Shipment not found." }, { status: 404 });
    }
    return NextResponse.json(shipment);
  }

  // Return full list with optional status filter
  const status = searchParams.get("status");
  const data   = status ? SHIPMENTS.filter((s) => s.status === status) : SHIPMENTS;

  return NextResponse.json(data);
}
