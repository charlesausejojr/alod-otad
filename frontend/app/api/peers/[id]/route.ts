import { NextResponse } from 'next/server';

const BASE_URL = 'http://localhost:5000/api/peers';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
  
        if (!id) {
            return NextResponse.json({ error: 'Peer ID is required.' }, { status: 400 });
        }
  
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
        });
  
        console.log(response);
  
        if (!response.ok) {
            throw new Error(`Error deleting Peer: ${response.statusText}`);
        }
  
        return NextResponse.json({ message: 'Peer deleted successfully.' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting peer:', error);
        const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
        return NextResponse.json({ error: message }, { status: 500 });
    }
  }

  
export async function PUT(request: Request) {
    try {
        const peer = await request.json();
  
        if (!peer.steamId) {
            return NextResponse.json({ error: 'Peer ID is required for updating.' }, { status: 400 });
        }
    
        const response = await fetch(`${BASE_URL}/${peer.steamId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(peer),
        });
    
        if (!response.ok) {
            throw new Error(`Error updating Peer: ${response.statusText}`);
        }
    
        const updatedPeer = await response.json();
        return NextResponse.json(updatedPeer, { status: 200 });
    } catch (error) {
        console.error('Error updating peer:', error);
        const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
        return NextResponse.json({ error: message }, { status: 500 });
    }
  }