import React from 'react'

const LeaderboardBadge = () => {
    return (
        <div>
            {badgesData.map((badge, index) => (
                <div key={index}>
                    <img src={badge.badgeImage} alt={badge.badgeName} />
                    <p>{badge.badgeName}</p>
                    <p>{badge.desc}</p>
                </div>
            ))}
        </div>
    )
}

export default LeaderboardBadge
