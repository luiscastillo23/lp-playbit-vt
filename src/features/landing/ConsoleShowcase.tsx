import React from 'react';

export const ConsoleShowcase: React.FC = () => {
  const speakerGrid = [
    [0, 1, 1, 1, 0],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [0, 1, 1, 1, 0],
  ];

  return (
    <div className="relative z-20 flex items-center justify-center pointer-events-none my-4 lg:my-0">
      <div
        className="relative w-[290px] h-[440px] sm:w-[340px] sm:h-[515px] transition-transform duration-500 hover:scale-[1.02] pointer-events-auto"
        style={{
          transform: 'rotate(-14deg)',
        }}
      >
        <div
          className="absolute -inset-3 rounded-[48px] pointer-events-none"
          style={{
            boxShadow:
              '-25px 45px 65px -10px rgba(24, 22, 21, 0.48), 0 25px 35px -15px rgba(0, 0, 0, 0.35)',
          }}
        />

        <div
          className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-[#FF7124] via-[#F85E10] to-[#C84304]"
          style={{
            transform: 'translate(14px, 14px)',
            boxShadow: 'inset -4px -6px 12px rgba(0,0,0,0.35)',
          }}
        >
          <div className="absolute top-[16%] -right-[4px] w-[7px] h-14 rounded-r-md bg-gradient-to-b from-[#FFFFFF] via-[#DCD7D2] to-[#9E9892] shadow-md border-l border-black/20" />
          <div className="absolute top-[30%] right-1.5 w-[2px] h-[55%] bg-black/15 rounded-full" />
          <div className="absolute bottom-[5px] left-1/2 -translate-x-1/2 w-12 h-3 rounded-full bg-[#2B1508] border border-[#FF8547]/40 shadow-inner flex items-center justify-center">
            <div className="w-7 h-1 bg-[#6E6A66] rounded-full" />
          </div>
        </div>

        <div className="absolute inset-0 rounded-[38px] bg-gradient-to-br from-[#FFFFFF] via-[#F7F3EB] to-[#DFD8CE] p-[5px] shadow-[inset_0_2px_4px_rgba(255,255,255,0.9)]">
          <div className="relative w-full h-full rounded-[33px] bg-gradient-to-br from-[#FBF8F3] via-[#F2ECE1] to-[#E5DDD0] p-4 sm:p-5 flex flex-col justify-between shadow-[inset_0_-6px_14px_rgba(0,0,0,0.08)] border border-white/60">
            
            <div className="relative w-full h-[47%] rounded-[22px] bg-[#F85E10] p-[3.5px] shadow-[0_3px_8px_rgba(248,94,16,0.25)]">
              <div className="relative w-full h-full rounded-[19px] bg-gradient-to-br from-[#2B2B2B] via-[#151515] to-[#0A0A0A] p-3 overflow-hidden shadow-[inset_0_4px_12px_rgba(0,0,0,0.9)]">
                <div className="relative w-full h-full rounded-[12px] bg-gradient-to-tr from-[#0E0E0E] via-[#1C1C1C] to-[#292929] overflow-hidden border border-white/5">
                  <div
                    className="absolute -inset-full bg-gradient-to-br from-white/20 via-white/5 to-transparent pointer-events-none"
                    style={{
                      transform: 'rotate(-22deg) translateY(-18%)',
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="relative w-full flex items-center justify-between px-2 sm:px-3 my-auto">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#E3DCD0] to-[#F7F3EC] shadow-[inset_0_3px_7px_rgba(0,0,0,0.12)] flex items-center justify-center border border-white/50">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 drop-shadow-[0_6px_8px_rgba(0,0,0,0.45)]">
                  <div className="absolute top-1/2 left-1 -translate-y-1/2 w-[92%] h-7 sm:h-8 bg-gradient-to-b from-[#2E2E2E] to-[#141414] rounded-[6px] border-t border-white/15 flex items-center justify-between px-2">
                    <span className="w-0 h-0 border-y-[5px] border-y-transparent border-r-[7px] border-r-[#555]" />
                    <span className="w-0 h-0 border-y-[5px] border-y-transparent border-l-[7px] border-l-[#555]" />
                  </div>
                  <div className="absolute left-1/2 top-1 -translate-x-1/2 h-[92%] w-7 sm:w-8 bg-gradient-to-r from-[#2E2E2E] to-[#141414] rounded-[6px] border-t border-white/15 flex flex-col items-center justify-between py-2">
                    <span className="w-0 h-0 border-x-[5px] border-x-transparent border-b-[7px] border-b-[#555]" />
                    <span className="w-0 h-0 border-x-[5px] border-x-transparent border-t-[7px] border-t-[#555]" />
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gradient-to-br from-[#121212] to-[#2A2A2A] shadow-inner" />
                </div>
              </div>

              <div className="relative w-28 h-24 sm:w-32 sm:h-28">
                <div className="absolute bottom-2 left-1 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#FF8A47] via-[#F85E10] to-[#C84304] shadow-[0_7px_12px_rgba(0,0,0,0.38),inset_0_2px_4px_rgba(255,255,255,0.6)] border border-[#D94B07]" />
                <div className="absolute top-2 right-1 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#FF8A47] via-[#F85E10] to-[#C84304] shadow-[0_7px_12px_rgba(0,0,0,0.38),inset_0_2px_4px_rgba(255,255,255,0.6)] border border-[#D94B07]" />
              </div>
            </div>

            <div className="relative w-full flex items-end justify-between px-2 pb-1">
              <div className="flex flex-col gap-1.5 pb-1">
                <span className="w-7 h-1.5 rounded-full bg-[#F85E10] shadow-[inset_0_1px_2px_rgba(0,0,0,0.35)]" />
                <span className="w-7 h-1.5 rounded-full bg-[#F85E10] shadow-[inset_0_1px_2px_rgba(0,0,0,0.35)]" />
                <span className="w-7 h-1.5 rounded-full bg-[#F85E10] shadow-[inset_0_1px_2px_rgba(0,0,0,0.35)]" />
              </div>

              <div className="flex items-center gap-3 pb-2">
                <span
                  className="w-7 h-2.5 rounded-full bg-gradient-to-b from-[#2D2D2D] to-[#121212] shadow-[0_3px_5px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.2)]"
                  style={{ transform: 'rotate(-28deg)' }}
                />
                <span
                  className="w-7 h-2.5 rounded-full bg-gradient-to-b from-[#2D2D2D] to-[#121212] shadow-[0_3px_5px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.2)]"
                  style={{ transform: 'rotate(-28deg)' }}
                />
              </div>

              <div className="grid grid-cols-5 gap-1.5 p-1">
                {speakerGrid.flat().map((active, idx) =>
                  active ? (
                    <span
                      key={idx}
                      className="w-1.5 h-1.5 rounded-full bg-[#231F1D] shadow-[inset_0_1px_1px_rgba(0,0,0,0.8)]"
                    />
                  ) : (
                    <span key={idx} className="w-1.5 h-1.5" />
                  )
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
