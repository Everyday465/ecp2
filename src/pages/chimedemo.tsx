import React, { useState } from 'react';
import * as ChimeSDK from 'amazon-chime-sdk-js';

const Chimedemo = () => {
    const [response, setResponse] = useState<string>('');
    const [meetingId, setMeetingId] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [meetingSession, setMeetingSession] = useState<ChimeSDK.DefaultMeetingSession | null>(null);
    const [attendees, setAttendees] = useState<Set<string>>(new Set());

    const logger = new ChimeSDK.ConsoleLogger('ChimeMeetingLogs', ChimeSDK.LogLevel.INFO);
    const deviceController = new ChimeSDK.DefaultDeviceController(logger);

    const updateTiles = () => {
        if (!meetingSession) return;

        meetingSession.audioVideo.getAllVideoTiles().forEach((tile) => {
            const tileState = tile.state();
            const tileId = tileState.tileId;
            if (!tileId) return;

            let divElement = document.getElementById(`div-${tileId}`);
            if (!divElement) {
                divElement = document.createElement('div');
                divElement.id = `div-${tileId}`;
                const videoElement = document.createElement('video');
                videoElement.id = `video-${tileId}`;
                videoElement.autoplay = true;
                videoElement.style.width = '300px';
                videoElement.style.height = '200px';
                divElement.appendChild(videoElement);
                document.getElementById('video-list')?.appendChild(divElement);
                meetingSession.audioVideo.bindVideoElement(tileId, videoElement);
            }
        });
    };

    const attendeeObserver = (attendeeId: string, present: boolean, externalUserId?: string) => {
        const attendeeName = externalUserId?.split('#')[0] || 'Unknown User';
        setAttendees((prev) => {
            const updated = new Set(prev);
            if (present) updated.add(attendeeName);
            else updated.delete(attendeeName);
            return updated;
        });
    };

    const doMeeting = async () => {
        if (!userName.trim()) {
            alert('Please enter your name');
            return;
        }

        if (userName.includes('#')) {
            alert('Please do not use special characters in your name');
            return;
        }

        if (meetingSession) return;

        try {
            const response = await fetch('https://yjfs7k6xp9.execute-api.us-east-1.amazonaws.com/dev/meetings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'DO_MEETING', MEETING_ID: meetingId, USERNAME: userName }),
            });
            const data = await response.json();

            if (!data.Info) {
                alert('Oops! The meeting might have ended!');
                return;
            }

            const meetingConfig = new ChimeSDK.MeetingSessionConfiguration(
                data.Info.Meeting.Meeting,
                data.Info.Attendee.Attendee
            );

            const newMeetingSession = new ChimeSDK.DefaultMeetingSession(meetingConfig, logger, deviceController);
            setMeetingSession(newMeetingSession);

            const audioInputs = await newMeetingSession.audioVideo.listAudioInputDevices();
            const videoInputs = await newMeetingSession.audioVideo.listVideoInputDevices();

            if (audioInputs.length) {
                await newMeetingSession.audioVideo.startAudioInput(audioInputs[0].deviceId);
            }

            if (videoInputs.length) {
                await newMeetingSession.audioVideo.startVideoInput(videoInputs[0].deviceId);
            }

            newMeetingSession.audioVideo.addObserver({ videoTileDidUpdate: updateTiles });
            newMeetingSession.audioVideo.realtimeSubscribeToAttendeeIdPresence(attendeeObserver);

            newMeetingSession.audioVideo.start();
            newMeetingSession.audioVideo.startLocalVideoTile();

            setResponse('Meeting started successfully');
        } catch (err) {
            console.error('Error starting meeting:', err);
            alert('Failed to start the meeting. Please check the console for details.');
        }
    };

    const cleanup = () => {
        if (meetingSession) {
            meetingSession.audioVideo.stopLocalVideoTile();
            meetingSession.audioVideo.realtimeUnsubscribeToAttendeeIdPresence(attendeeObserver);
            meetingSession.audioVideo.stop();
            setMeetingSession(null);
        }
        setMeetingId('');
        setResponse('');
        setAttendees(new Set());
        document.getElementById('video-list')?.replaceChildren();
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', marginTop: '50px' }}>
            <h1>Chime Video Call Demo</h1>
            <div>
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <button onClick={doMeeting}>Start/Join Meeting</button>
                <button onClick={cleanup}>End Meeting</button>
            </div>
            <pre>{response}</pre>
            <div id="video-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }} />
            <p>Attendees: {Array.from(attendees).join(', ')}</p>
        </div>
    );
};

export default Chimedemo;
